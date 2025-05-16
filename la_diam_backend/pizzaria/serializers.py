from rest_framework import serializers
from .models import Profile, Product, Order, OrderItem, Comment, Rating, Message


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
        read_only=True, max_digits=10, decimal_places=2
    )
    average_rating = serializers.FloatField(read_only=True)
    number_of_ratings = serializers.IntegerField(read_only=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "description",
            "default_price",
            "promotion",
            "discount_price",
            "is_available",
            "image",
            "type",
            "nr_of_orders",
            "average_rating",
            "number_of_ratings",
        ]


class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = [
            "id",
            "product",
            "quantity",
            "price",
            "order_product_image_link",
            "order_product_name",
            "product_name",
        ]
        read_only_fields = ["price"]

    def get_product_name(self, obj):
        return obj.product.name if obj.product else ""


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ["id", "user", "user_email", "order_date", "status", "items", "price"]
        read_only_fields = ["user", "user_email", "order_date", "price"]

    def create(self, validated_data):
        # Remove os dados de 'items' do validated_data
        items_data = validated_data.pop("items")

        # Cria o pedido associado ao usuário autenticado
        order = Order.objects.create(
            user=self.context["request"].user, **validated_data
        )

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
        return obj.product.name if obj.product else None


class RatingSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    product = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Rating
        fields = '__all__'
        read_only_fields = ['user']

    def get_product_name(self, obj):
        return obj.product.name if obj.product else None


class MessageSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Message
        fields = [
            "id",
            "user",
            "title",
            "content",
            "created_at",
            "read",
        ]
        read_only_fields = ["user", "created_at"]