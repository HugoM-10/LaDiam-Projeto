from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.pagination import PageNumberPagination

from .models import Order, OrderItem, Message
from .serializers import OrderSerializer, OrderItemSerializer

from .permissions import (
    gestor_required,
    vendedor_or_gestor_required,
    is_vendedor_or_gestor,
)


@api_view(["GET"])
@vendedor_or_gestor_required
def orders_view(request):
    if request.method == "GET":
        # Get order filtering
        ordering = request.GET.get("ordering", "-order_date")

        if is_vendedor_or_gestor(request.user):
            orders = Order.objects.all().order_by(ordering)
        else:
            return Response(
                {"error": "You do not have permission to view all orders"},
                status=status.HTTP_403_FORBIDDEN,
            )

        paginator = PageNumberPagination()
        paginator.page_size = 10

        result_page = paginator.paginate_queryset(orders, request)
        serializer = OrderSerializer(result_page, many=True)
        return Response(serializer.data)

    

@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def my_orders_view(request):
    if request.method == "GET":
        ordering = request.GET.get("ordering", "-order_date")

        orders = Order.objects.filter(user=request.user).order_by(ordering)

        paginator = PageNumberPagination()
        paginator.page_size = 10

        result_page = paginator.paginate_queryset(orders, request)
        serializer = OrderSerializer(result_page, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = OrderSerializer(data=request.data, context={"request": request})

        if serializer.is_valid():
            order = serializer.save()

        # Cria a mensagem para o usuário
        Message.objects.create(
            user=request.user,
            title="Novo Pedido Criado",
            content=f"O seu pedido #{order.id} foi criado com status '{order.status}'."
        )

        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def order_detail(request, order_id):
    if request.method == "GET":
        # Check if the order exists or return 404
        order = get_object_or_404(Order, id=order_id)

        if order.user != request.user and not is_vendedor_or_gestor(request.user):
            return Response(
                {"error": "You do not have permission to view this order"},
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)

    
    elif request.method == "DELETE":
        # Check if the order exists or return 404
        order = get_object_or_404(Order, id=order_id)

        # Check if the order belongs to the user and if the user is not an admin
        if order.user != request.user and not is_vendedor_or_gestor(request.user):
            return Response(
                {"error": "You do not have permission to delete this order"},
                status=status.HTTP_403_FORBIDDEN,
            )

        order.delete()
        return Response(
            {"message": "Order deleted successfully"}, status=status.HTTP_204_NO_CONTENT
        )
    return Response(
        {"error": "Invalid request method"}, status=status.HTTP_400_BAD_REQUEST
    )


@api_view(["PUT"])
@vendedor_or_gestor_required
def update_order_status_view(request, order_id):
    order = get_object_or_404(Order, id=order_id)


    statuses = ["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELED"]
    new_status_order = request.data.get("status")

    if new_status_order not in statuses:
        return Response(
            {
                "error": "Invalid status",
                "received": new_status_order,
                "allowed_statuses": statuses,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    if order.status != new_status_order:
        order.status = new_status_order
        order.save()

        Message.objects.create(
            user=order.user,
            title="Pedido Atualizado",
            content=f"O status do seu pedido #{order.id} foi alterado para '{order.status}'."
        )

    return Response({"id": order.id, "status": order.status}, status=status.HTTP_200_OK)



