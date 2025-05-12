from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from .models import Product
from .serializers import ProductSerializer

@api_view(['GET'])
def get_products_view(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_product_view(request):
    name = request.data.get('name')
    description = request.data.get('description')
    default_price = request.data.get('default_price')
    promotion = request.data.get('promotion')
    image_link = request.data.get('image_link')
    is_available = request.data.get('is_available') 

    new_product = Product.objects.create(
        name=name,
        description=description,
        default_price = default_price,
        image_link=image_link,
        promotion=promotion,
        is_available=is_available
    )
    return Response({'id': new_product.id, 'name': new_product.name}, status=status.HTTP_201_CREATED)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_product_view(request):
    product_id = request.data.get('id')
    product = Product.objects.get(id=product_id)

    if not product:
        return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

    name = request.data.get('name')
    description = request.data.get('description')
    default_price = request.data.get('default_price')
    image_link = request.data.get('image_link')
    promotion = request.data.get('promotion')
    is_available = request.data.get('is_available') 

    if name:
        product.name = name
    if description:
        product.description = description
    if default_price:
        product.default_price = default_price
    if image_link:
        product.image_link = image_link
    if promotion:
        product.promotion = promotion
    if is_available is not None:
        product.is_available = is_available

    product.save()
    return Response({'id': product.id, 'name': product.name}, status=status.HTTP_200_OK)