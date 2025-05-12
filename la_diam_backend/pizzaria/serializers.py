from rest_framework import serializers
from .models import Profile,Product

class FlexibleDateField(serializers.DateField):
    def to_internal_value(self, value):
        if value == "":
            return None
        return super().to_internal_value(value)

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
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
