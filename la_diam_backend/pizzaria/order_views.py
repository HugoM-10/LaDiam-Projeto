from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from .models import Order, OrderItem
from .serializers import OrderSerializer, OrderItemSerializer

@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_all_orders_view(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_my_orders_view(request):
    user = request.user
    orders = Order.objects.filter(user=user)
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_order_view(request):
    order_id = request.data.get('id')
    order = Order.objects.get(id=order_id)
    
    if not order:
        return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
    
    # Check if the order belongs to the user
    if order.user != request.user:
        return Response({'error': 'You do not have permission to view this order'}, status=status.HTTP_403_FORBIDDEN)

    serializer = OrderSerializer(order)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def edit_order_view(request):
    order_id = request.data.get('id')
    order = Order.objects.get(id=order_id)
    
    if not order:
        return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

    # Check if the order belongs to the user and if the user is not an admin
    if order.user != request.user and not request.user.is_staff:
        return Response({'error': 'You do not have permission to edit this order'}, status=status.HTTP_403_FORBIDDEN)

    quantity = request.data.get('quantity')
    status = request.data.get('status')

    if quantity:
        order.quantity = quantity
    if status:
        order.status = status

    order.save()
    return Response({'id': order.id, 'status': order.status}, status=status.HTTP_200_OK)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_order_view(request):
    order_id = request.data.get('id')
    order = Order.objects.get(id=order_id)

    # Check if the order belongs to the user and if the user is not an admin
    if order.user != request.user and not request.user.is_staff:
        return Response({'error': 'You do not have permission to delete this order'}, status=status.HTTP_403_FORBIDDEN)

    if not order:
        return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

    order.delete()
    return Response({'message': 'Order deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
