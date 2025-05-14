from .models import Comment, Product
from .serializers import CommentSerializer
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


@api_view(['GET'])
def get_comments_view(request, product_id=None):
    if product_id:
        comments = Comment.objects.filter(product__id=product_id).order_by('-data_publicacao')
    else:
        comments = Comment.objects.all().order_by('-data_publicacao')
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_my_comments_view(request):
    user = request.user
    comments = Comment.objects.filter(user=user).order_by('-data_publicacao')
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_comment_view(request):
    product_id = request.data.get('product_id')
    texto = request.data.get('texto')

    if not product_id or not texto:
        return Response({'error': 'product_id e texto são obrigatórios.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({'error': 'Produto não encontrado.'}, status=status.HTTP_404_NOT_FOUND)

    comment = Comment.objects.create(
        user=request.user,
        product=product,
        texto=texto
    )
    serializer = CommentSerializer(comment)
    return Response(serializer.data, status=status.HTTP_201_CREATED)
