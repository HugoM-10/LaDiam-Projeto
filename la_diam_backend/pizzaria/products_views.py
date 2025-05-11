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
def add_product_view(request):
    name = request.data.get('name')
    description = request.data.get('description')
    price = request.data.get('price')
    image = request.data.get('image')
    promotion = request.data.get('promotion')
    is_available = request.data.get('is_available') 

    new_product = Product.objects.create(
        name=name,
        description=description,
        price=price,
        image_link=image,
        promotion=promotion,
        is_available=is_available
    )
    return Response({'id': new_product.id, 'name': new_product.name}, status=status.HTTP_201_CREATED)



# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def user_view(request):
#     print(f"User authenticated: {request.user.is_authenticated}")
#     print(f"User: {request.user.username}")
#     return Response({'username': request.user.username, 'email': request.user.email})

# @api_view(['GET', 'PUT'])
# @permission_classes([IsAuthenticated])
# def user_profile_view(request):
#     profile = request.user.profile
    
#     if request.method == 'GET':
#         serializer = ProfileSerializer(profile)
#         return Response(serializer.data)

#     elif request.method == 'PUT':
#         serializer = ProfileSerializer(profile, data=request.data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
