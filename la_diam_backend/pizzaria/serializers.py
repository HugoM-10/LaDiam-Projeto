
from rest_framework import serializers
from .models import Profile, Product, Order, OrderItem, Comment


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
            'image_link',
            'type',
            'nr_of_orders',
        ]

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = OrderItem
        fields = ["product", "product_name", "quantity", "price"]
        read_only_fields = ["price"]

    def get_product_name(self, obj):
        return obj.product.name




class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ["id", "user", "order_date", "status", "items", "price"]
        read_only_fields = ["user", "order_date", "status", "price"]
    
    def create(self, validated_data):
        # Remove os dados de 'items' do validated_data
        items_data = validated_data.pop('items')

        # Cria o pedido associado ao usuário autenticado
        order = Order.objects.create(user=self.context['request'].user, **validated_data)

        # Cria os itens do pedido e calcula o preço total
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)

        # Atualiza o preço total do pedido
        order.update_price()

        return order
    

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    product_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Comment
        fields = [
            "id",
            "user",
            "product",
            "product_name",
            "texto",
            "data_publicacao",
        ]
        read_only_fields = ['user', 'data_publicacao']

    def get_product_name(self, obj):
        return obj.product.name
