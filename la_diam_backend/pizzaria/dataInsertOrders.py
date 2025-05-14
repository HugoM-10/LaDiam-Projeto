import os
import sys
import django

# Add the project root directory to Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Set the Django settings module
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "la_diam_backend.settings")

# Setup Django
django.setup()

# Now Django environment is ready
from django.contrib.auth.models import User
from pizzaria.models import Profile, Product, Order, OrderItem
from decimal import Decimal

# Create sample users
user1 = User.objects.create_user(username='john', email='john@example.com', password='pass')
user2 = User.objects.create_user(username='jane', email='jane@example.com', password='pass')

# Create profiles
Profile.objects.create(user=user1, full_name="John Doe", gender="Male", phone_number="1234567890", address="123 Main St")
Profile.objects.create(user=user2, full_name="Jane Smith", gender="Female", phone_number="0987654321", address="456 Oak Ave")

# Create sample products
products = [
    Product.objects.create(name="Margherita Pizza", description="Classic pizza", default_price=Decimal("10.00"), promotion=10, type="Pizza"),
    Product.objects.create(name="Coke", description="Chilled drink", default_price=Decimal("2.00"), type="Drink"),
    Product.objects.create(name="Tiramisu", description="Italian dessert", default_price=Decimal("5.00"), promotion=20, type="Dessert"),
]

# Create a sample order for user1
order1 = Order.objects.create(user=user1)

# Add order items
OrderItem.objects.create(order=order1, product=products[0], quantity=2)
OrderItem.objects.create(order=order1, product=products[1], quantity=3)

# Create another order for user2
order2 = Order.objects.create(user=user2)

# Add order items
OrderItem.objects.create(order=order2, product=products[2], quantity=1)
OrderItem.objects.create(order=order2, product=products[0], quantity=1)

# Done! Check your database or admin panel.
