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
from pizzaria.models import Product, Order, OrderItem
from decimal import Decimal
import random

user = User.objects.get(username='john')

for i in range(3):
    order = Order.objects.create(user=user)
    num_items = random.randint(2, 5)  # Random number of items per order
    
    # Add some order items with random quantities
    for _ in range(num_items):
        product = Product.objects.get(id=random.randint(1, 20))  # Randomly choose a product
        quantity = random.randint(1, 5)  # Random quantity per product
        OrderItem.objects.create(order=order, product=product, quantity=quantity)

    # Update the total price for the order
    order.update_price()
    
    # Print order details
    print(f"Order #{order.id} created with total: ${order.price}")