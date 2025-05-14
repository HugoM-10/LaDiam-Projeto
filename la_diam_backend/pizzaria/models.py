from django.db import models
from django.contrib.auth.models import User
from decimal import Decimal, ROUND_HALF_UP

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
    default_price = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    promotion = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    image_link = models.URLField(max_length=200, blank=True, null=True)
    is_available = models.BooleanField(default=True, null=False)
    type = models.CharField(
        choices=[
            ('Pizza', 'Pizza'),
            ('Drink', 'Drink'),
            ('Dessert', 'Dessert'),
            ('Appetizer', 'Appetizer'),
            ('Other', 'Other')
        ],
        max_length=10,
        default='Other'
    )
    nr_of_orders = models.IntegerField(default=0, null=False)


    def __str__(self):
        return self.name
    
    @property
    def discount_price(self):
        if self.promotion is not None and self.promotion > 0:
            discount_factor = Decimal(1) - (self.promotion / Decimal(100))
            return (self.default_price * discount_factor).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
        return self.default_price


class Order(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Accepted', 'Accepted'),
        ('Rejected', 'Rejected'),
        ('Completed', 'Completed'),
        ('Cancelled', 'Cancelled'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    order_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default='Pending', choices=STATUS_CHOICES)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=False, default=0.00)

    def __str__(self):
        return f"Order {self.id} by {self.user.username}"

    def update_price(self):
        total_price = sum(item.price for item in self.items.all())
        self.price = total_price
        self.save()

    def user_email(self):
        return self.user.email if self.user else None

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=False, default=0.00)

    def save(self, *args, **kwargs):

        # Add quantity do product on column nr_of_orders
        self.product.nr_of_orders += self.quantity
        self.product.save()

        self.price = self.product.discount_price * self.quantity
        super().save(*args, **kwargs)

        # Update the order's total price whenever an item is saved.
        self.order.update_price()

    @property
    def order_product_image_link(self):
        return self.product.image_link if self.product else None
    @property
    def order_product_name(self):
        return self.product.name if self.product else None

    def __str__(self):
        return f"{self.quantity} of {self.product.name} in Order {self.order.id} - {self.price}"
    
class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='comments')
    texto = models.TextField()
    data_publicacao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}'s comment on the product {self.product.name}"
    

class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ratings')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='ratings')
    rating = models.IntegerField(choices=[(i, str(i)) for i in range(1, 6)])  # 1-5 estrelas

    class Meta:
        unique_together = ['user', 'product']  # Restrição: 1 avaliação por usuário-produto

    def __str__(self):
        return f"Avaliação de {self.user.username} para {self.product.name}: {self.rating}★"

    def get_average_rating(self):
        ratings = self.product.ratings.all()
        if ratings.exists():
            total_rating = sum(rating.rating for rating in ratings)
            average_rating = total_rating / ratings.count()
            return round(average_rating, 2)  # Retorna a média arredondada para 2 casas decimais
        return 0.0  # Se não houver avaliações, retorna 0