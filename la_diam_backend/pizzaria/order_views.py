from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from .models import Order, OrderItem
from .serializers import OrderSerializer, OrderItemSerializer

from .permissions import (
    gestor_required,
    vendedor_or_gestor_required,
    is_vendedor_or_gestor,
)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_order_view(request):
    serializer = OrderSerializer(data=request.data, context={"request": request})

    if serializer.is_valid():
        order = serializer.save()
        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_orders_view(request):
    if is_vendedor_or_gestor(request.user):
        orders = Order.objects.all()
    else:
        orders = Order.objects.filter(user=request.user)

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
    status_order = request.data.get("status")
    if status_order:
        order.status = status_order

    order.save()
    return Response({"id": order.id, "status": order.status}, status=status.HTTP_200_OK)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_order_view(request, order_id):
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

@api_view(["PUT"])
@vendedor_or_gestor_required
def update_order_status_view(request, order_id):
    # Check if the order exists or return 404
    order = get_object_or_404(Order, id=order_id)
    
    new_status = request.data.get("status")

    valid_statuses = [choice[0] for choice in Order.STATUS_CHOICES]

    if new_status not in valid_statuses:
        return Response(
            {"error": "Invalid status","possible_statuses": valid_statuses}, status=status.HTTP_400_BAD_REQUEST
        )

    order.status = new_status

    order.save()
    return Response({"id": order.id, "status": order.status}, status=status.HTTP_200_OK)