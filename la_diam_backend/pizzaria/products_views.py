from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.pagination import PageNumberPagination

from .models import Product
from .serializers import ProductSerializer

from .permissions import is_vendedor_or_gestor, gestor_required


@api_view(["GET", "POST", "PUT"])
def products_view(request):
    if request.method == "GET":
        ordering = request.GET.get("ordering", "id")
        product_type = request.GET.get("type", None)

        if product_type:
            products = Product.objects.filter(type=product_type).order_by(ordering)
        else:
            products = Product.objects.all().order_by(ordering)

        paginator = PageNumberPagination()
        paginator.page_size = 12

        result_page = paginator.paginate_queryset(products, request)
        serializer = ProductSerializer(result_page, many=True)
        return Response(serializer.data)

    elif request.method == "POST":

        if is_vendedor_or_gestor(request.user):
            name = request.data.get("name")
            description = request.data.get("description")
            default_price = request.data.get("default_price")
            promotion = request.data.get("promotion")
            image_link = request.data.get("image_link")
            is_available = request.data.get("is_available")

            new_product = Product.objects.create(
                name=name,
                description=description,
                default_price=default_price,
                image_link=image_link,
                promotion=promotion,
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

        if is_vendedor_or_gestor(request.user):
            product_id = request.data.get("id")
            product = Product.objects.get(id=product_id)

            if not product:
                return Response(
                    {"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND
                )

            name = request.data.get("name")
            description = request.data.get("description")
            default_price = request.data.get("default_price")
            image_link = request.data.get("image_link")
            promotion = request.data.get("promotion")
            is_available = request.data.get("is_available")

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
            return Response(
                {"id": product.id, "name": product.name}, status=status.HTTP_200_OK
            )
        return Response(
            {"error": "Permission denied"}, status=status.HTTP_403_FORBIDDEN
        )
    return Response(
        {"error": "Invalid request method"}, status=status.HTTP_400_BAD_REQUEST
    )
