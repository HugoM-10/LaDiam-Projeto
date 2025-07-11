from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.pagination import PageNumberPagination
from django.shortcuts import get_object_or_404

from .models import Product
from .serializers import ProductSerializer

from .permissions import is_vendedor_or_gestor, gestor_required


@api_view(["GET"])
def product_view(request, product_id):
    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response(
            {"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND
        )

    serializer = ProductSerializer(product)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET", "POST", "PUT", "DELETE"])
def products_view(request):
    if request.method == "GET":
        ordering = request.GET.get("ordering", "id")
        product_type = request.GET.get("type", None)

        if is_vendedor_or_gestor(request.user):
            products = Product.objects.filter(is_available=True).order_by(ordering)
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        if product_type:
            products = Product.objects.filter(type=product_type.capitalize()).order_by(ordering)
        else:
            products = Product.objects.all().order_by(ordering)

        paginator = PageNumberPagination()
        paginator.page_size = 8

        result_page = paginator.paginate_queryset(products, request)
        serializer = ProductSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

    elif request.method == "POST":

        if is_vendedor_or_gestor(request.user):
            is_available_str = request.data.get("is_available")
            if is_available_str in ["true", "True", True]:
                is_available = True
            else:
                is_available = False

            new_product = Product.objects.create(
            name=request.data.get("name"),
            type=request.data.get("type"),
            description=request.data.get("description"),
            default_price=request.data.get("default_price"),
            image=request.data.get("image"),
            promotion=request.data.get("promotion"),
            is_available=is_available,
            )
            return Response(
                {"id": new_product.id, "name": new_product.name},
                status=status.HTTP_201_CREATED,
        )
        return Response(
            {"error": "Permission denied"}, status=status.HTTP_403_FORBIDDEN
        )

    elif request.method == "PUT":
        id = request.data.get("id")
        if is_vendedor_or_gestor(request.user):
            product = get_object_or_404(Product, id=id)

            newName = request.data.get("name")
            newDescription = request.data.get("description")
            newDefaultPrice = request.data.get("default_price")
            newImage = request.data.get("image")
            newPromotion = request.data.get("promotion")
            newIsAvailable = request.data.get("is_available")
            newType = request.data.get("type")

            if newName:
                product.name = newName

            if newDescription:
                product.description = newDescription

            if newDefaultPrice:
                product.default_price = newDefaultPrice

            if newImage:
                product.image = newImage

            if newType:
                product.type = newType

            if newPromotion:
                product.promotion = newPromotion
            
            if newIsAvailable is not None:
                is_available_str = newIsAvailable.capitalize()
                product.is_available = is_available_str

            product.save()
            return Response(
                {"id": product.id, "name": product.name}, status=status.HTTP_200_OK
            )
        return Response(
            {"error": "Permission denied"}, status=status.HTTP_403_FORBIDDEN
        )
    elif request.method == "DELETE":
        if is_vendedor_or_gestor(request.user):
            product_id = request.data.get("id")
            product = Product.objects.get(id=product_id)

            if not product:
                return Response(
                    {"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND
                )

            product.delete()
            return Response(
                {"message": "Product deleted successfully"}, status=status.HTTP_204_NO_CONTENT
            )
        return Response(
            {"error": "Permission denied"}, status=status.HTTP_403_FORBIDDEN
        )
    return Response(
        {"error": "Invalid request method"}, status=status.HTTP_400_BAD_REQUEST
    )
