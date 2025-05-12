from rest_framework import serializers
from .models import Profile,Product, Order, OrderItem

class FlexibleDateField(serializers.DateField):
    def to_internal_value(self, value):
        if value == "":
            return None
        return super().to_internal_value(value)

class ProfileSerializer(serializers.ModelSerializer):
    dateOfBirth = FlexibleDateField(required=False, allow_null=True)

    class Meta:
        model = Profile
        fields = [
            'id',
            'user',
            'full_name',
            'gender',
            'dateOfBirth',
            'phone_number',
            'address',
            'subscribed_to_newsletter',
        ]

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'promotion', 'image_link', 'is_available']


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'user', 'product', 'quantity', 'order_date', 'price', 'status']

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'order', 'product', 'quantity', 'price']