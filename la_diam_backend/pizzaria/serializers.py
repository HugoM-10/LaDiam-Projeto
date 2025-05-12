from rest_framework import serializers
from .models import Profile, Product, Order, OrderItem


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
            "id",
            "user",
            "full_name",
            "gender",
            "dateOfBirth",
            "phone_number",
            "address",
            "subscribed_to_newsletter",
        ]


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "description",
            "price",
            "promotion",
            "image_link",
            "is_available",
        ]


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ["product", "quantity", "price"]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'order_date', 'status', 'items', 'price']
        read_only_fields = ['user', 'order_date', 'status', 'price']

    def create(self, validated_data):
        # Remove items from validated_data
        items_data = validated_data.pop('items')

        # Initialize total price
        total_price = 0

        # Create order instance
        order = Order.objects.create(user=self.context['request'].user, **validated_data)

        # Create order items and calculate total price
        for item_data in items_data:
            item = OrderItem.objects.create(order=order, **item_data)
            total_price += item.price * item.quantity

        # Update total price of the order
        order.price = total_price
        order.save()
        return order