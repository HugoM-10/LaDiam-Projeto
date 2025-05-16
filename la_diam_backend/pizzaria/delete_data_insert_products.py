import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "la_diam_backend.settings")
django.setup()

from pizzaria.models import Product

TIPOS = ["Pizza", "Drink", "Dessert", "Appetizer", "Other"]
BASES = [
    ("Pizza", "Pizza Margherita"),
    ("Drink", "Bebida Refrescante"),
    ("Dessert", "Sobremesa Doce"),
    ("Appetizer", "Entrada Saborosa"),
    ("Other", "Produto Diverso"),
]

nomes = []
for tipo, base_nome in BASES:
    nomes += [f"{base_nome} {i+1}" for i in range(20)]

deleted, _ = Product.objects.filter(name__in=nomes, type__in=TIPOS).delete()
print(f"{deleted} produtos criados por dataInsertProducts.py eliminados.")