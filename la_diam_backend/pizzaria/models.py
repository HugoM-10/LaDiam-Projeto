from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    full_name = models.CharField(max_length=100, blank=True)
    gender = models.CharField(
        choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')],
        max_length=10,
        blank=True
        )
    dateOfBirth = models.DateField(null=True, blank=True)
    #avatar = models.ImageField(upload_to='avatars/', default='avatars/default.png')
    phone_number = models.CharField(max_length=15, blank=True)
    address = models.TextField(blank=True)
    subscribed_to_newsletter = models.BooleanField(default=True)

    def __str__(self):
        return self.user.username
    
class Product(models.Model):
    name = models.CharField(max_length=100, null=False)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    promotion = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    image_link = models.URLField(max_length=200, blank=True, null=True)
    is_available = models.BooleanField(default=True, null=False)

    def __str__(self):
        return self.name