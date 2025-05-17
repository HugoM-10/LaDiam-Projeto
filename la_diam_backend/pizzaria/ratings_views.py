from .models import Rating, Product
from .serializers import RatingSerializer
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination

@api_view(['GET'])
def get_product_ratings_view(request, product_id):
    ordering = request.GET.get('ordering', '-data_publicacao')
    ratings_qs = Rating.objects.filter(product__id=product_id).order_by(ordering)
    
    paginator = PageNumberPagination()
    paginator.page_size = 10
    result_page = paginator.paginate_queryset(ratings_qs, request)
    serializer = RatingSerializer(result_page, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_rating_view(request):
    product_id = request.data.get('product_id')
    rating_value = request.data.get('rating')

    if not product_id or not rating_value:
        return Response({'error': 'product_id e rating são obrigatórios.'}, status=status.HTTP_400_BAD_REQUEST)

    product = get_object_or_404(Product, id=product_id)
    
    # Atualiza ou cria a avaliação do user para o produto
    rating_obj, created = Rating.objects.update_or_create(
        user=request.user,
        product=product,
        defaults={'rating': rating_value}
    )
    serializer = RatingSerializer(rating_obj)
    return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)