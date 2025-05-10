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