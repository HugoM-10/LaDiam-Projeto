from rest_framework import serializers
from .models import Profile, Product

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    discount_price = serializers.DecimalField(
        read_only=True,
        max_digits=10,
        decimal_places=2
    )
    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'description',
            'default_price',
            'promotion',
            'discount_price',
            'is_available',
        ]