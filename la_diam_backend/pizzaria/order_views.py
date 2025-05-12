from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from .models import Order, OrderItem
from .serializers import OrderSerializer, OrderItemSerializer


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_order_view(request):
    serializer = OrderSerializer(data=request.data, context={"request": request})
    
    if serializer.is_valid():
        # Cria o pedido e os itens associados
        order = serializer.save()

        # Retorna os dados do pedido criado
        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)
    
    # Retorna erros de validação, se houver
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def get_all_orders_view(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_my_orders_view(request):
    user = request.user
    orders = Order.objects.filter(user=user)
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_order_view(request, order_id):
    # Check if the order exists or return 404
    order = get_object_or_404(Order, id=order_id)

    
    if order.user != request.user and not request.user.is_staff:
        return Response(
            {"error": "You do not have permission to view this order"},
            status=status.HTTP_403_FORBIDDEN,
        )

    serializer = OrderSerializer(order)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def edit_order_view(request, order_id):
    # Check if the order exists or return 404
    order = get_object_or_404(Order, id=order_id)

    # Check if the order belongs to the user and if the user is not an admin
    if order.user != request.user and not request.user.is_staff:
        return Response(
            {"error": "You do not have permission to edit this order"},
            status=status.HTTP_403_FORBIDDEN,
        )

    # Update the order fields
    statusOrder = request.data.get("status")
    if statusOrder:
        order.status = statusOrder

    order.save()
    return Response({"id": order.id, "status": order.status}, status=status.HTTP_200_OK)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_order_view(request):
    order_id = request.data.get("id")
    # Check if the order exists or return 404
    order = get_object_or_404(Order, id=order_id)

    # Check if the order belongs to the user and if the user is not an admin
    if order.user != request.user and not request.user.is_staff:
        return Response(
            {"error": "You do not have permission to delete this order"},
            status=status.HTTP_403_FORBIDDEN,
        )

    order.delete()
    return Response(
        {"message": "Order deleted successfully"}, status=status.HTTP_204_NO_CONTENT
    )
