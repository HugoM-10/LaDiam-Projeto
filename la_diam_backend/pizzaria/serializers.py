from rest_framework import serializers
from .models import Profile,Product

class FlexibleDateField(serializers.DateField):
    def to_internal_value(self, value):
        if value == "":
            return None
        return super().to_internal_value(value)

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
