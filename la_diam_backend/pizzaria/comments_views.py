from .models import Comment, Product
from .serializers import CommentSerializer
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination


@permission_classes([IsAuthenticated])
@api_view(["GET", "POST"])
def comments_view(request, product_id=None):

    if request.method == "GET":
        ordering = request.GET.get("ordering", "-data_publicacao")
        page_size = int(request.GET.get("page_size", 10))

        product = get_object_or_404(Product, id=product_id)
        comments = Comment.objects.filter(product=product).order_by(ordering)

        paginator = PageNumberPagination()
        paginator.page_size = page_size
        result_page = paginator.paginate_queryset(comments, request)
        serializer = CommentSerializer(result_page, many=True)
        # Retorna resposta paginada (com next, previous, count, results)
        return paginator.get_paginated_response(serializer.data)

    if request.method == "POST":
        texto = request.data.get("texto")

        if not product_id or not texto:
            return Response(
                {"error": "product_id e texto são obrigatórios."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        product = get_object_or_404(Product, id=product_id)
        comment = Comment.objects.create(
            user=request.user, product=product, texto=texto
        )
        serializer = CommentSerializer(comment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_my_comments_view(request):
    ordering = request.GET.get("ordering", "-data_publicacao")
    page_size = int(request.GET.get("page_size", 10))
    user = request.user
    comments = Comment.objects.filter(user=user).order_by(ordering)

    paginator = PageNumberPagination()
    paginator.page_size = page_size
    result_page = paginator.paginate_queryset(comments, request)
    serializer = CommentSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)
