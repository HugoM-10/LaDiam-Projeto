import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "la_diam_backend.settings")
django.setup()

from pizzaria.models import Product

# Exemplo de imagens default (ajusta os caminhos conforme necessário)
DEFAULT_IMAGES = {
    "Pizza": "/media/defaults/default_pizza.png",
    "Drink": "/media/defaults/default_drink.png",
    "Dessert": "/media/defaults/default_dessert.png",
    "Appetizer": "/media/defaults/default_appetizer.png",
    "Other": "/media/defaults/default_other.png",
}

def make_products(tipo, base_nome, descricao, preco, promo, image=None):
    return [
        {
            "name": f"{base_nome} {i+1}",
            "description": f"{descricao} {i+1}",
            "default_price": preco + i,
            "promotion": promo if i % 2 == 0 else None,
            "is_available": True,
            "type": tipo,
            "image": image or DEFAULT_IMAGES[tipo],
        }
        for i in range(20)
    ]

products = []
products += make_products("Pizza", "Pizza Margherita", "Pizza clássica com molho de tomate, mussarela e manjericão fresco.", 12.99, 2.00)
products += make_products("Drink", "Bebida Refrescante", "Bebida gelada para acompanhar sua refeição.", 2.50, 0.5)
products += make_products("Dessert", "Sobremesa Doce", "Uma sobremesa irresistível.", 3.99, 1.0)
products += make_products("Appetizer", "Entrada Saborosa", "Entrada perfeita para começar.", 4.50, 0.75)
products += make_products("Other", "Produto Diverso", "Produto de categoria diversa.", 5.00, 0.0)

for product in products:
    if not Product.objects.filter(name=product["name"], type=product["type"]).exists():
        Product.objects.create(
            name=product["name"],
            description=product["description"],
            default_price=product["default_price"],
            promotion=product["promotion"],
            is_available=product["is_available"],
            type=product["type"],
            image=product["image"],
        )
        print(f"Produto '{product['name']}' ({product['type']}) adicionado com sucesso!")
    else:
        print(f"Produto '{product['name']}' ({product['type']}) já existe. Ignorado.")