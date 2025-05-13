import os
import django

# Configurações do Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "la_diam_backend.settings")
django.setup()

from pizzaria.models import Product

# Lista de produtos para adicionar
products = [
    {
        "name": "Pizza Margherita",
        "description": "Pizza clássica com molho de tomate, mussarela e manjericão fresco.",
        "default_price": 12.99,
        "image_link": "https://uk.ooni.com/cdn/shop/articles/20220211142645-margherita-9920_e41233d5-dcec-461c-b07e-03245f031dfe.jpg?v=1737105431&width=1080",
        "promotion": 2.00,
        "is_available": True,
        "type": "Pizza",
    },
    {
        "name": "Pizza Pepperoni",
        "description": "Pizza com molho de tomate, mussarela e fatias de pepperoni.",
        "default_price": 14.99,
        "image_link": "https://upload.wikimedia.org/wikipedia/commons/d/d1/Pepperoni_pizza.jpg",
        "promotion": 3.00,
        "is_available": True,
        "type": "Pizza",
    },
    {
        "name": "Pizza Quatro Queijos",
        "description": "Pizza com molho de tomate e uma mistura de quatro queijos: mussarela, gorgonzola, parmesão e provolone.",
        "default_price": 16.99,
        "image_link": "https://www.receitasnestle.com.br/sites/default/files/srh_recipes/d036cd01122da62bf581784f52d99b3a.jpg",
        "promotion": 4.00,
        "is_available": True,
        "type": "Pizza",
    },
    {
        "name": "Pizza Havaiana",
        "description": "Pizza com molho de tomate, mussarela, presunto e pedaços de abacaxi.",
        "default_price": 13.99,
        "image_link": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf6CqNEU3rr0yFP9Yu3Fs3VO2kItBJa00oMA&s",
        "promotion": 1.50,
        "is_available": True,
        "type": "Pizza",
    },
    {
        "name": "Pizza Vegetariana",
        "description": "Pizza com molho de tomate, mussarela e uma variedade de vegetais frescos, como pimentão, cogumelos e azeitonas.",
        "default_price": 15.99,
        "image_link": "https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg",
        "promotion": 2.50,
        "is_available": True,
        "type": "Pizza",
    },
    {
        "name": "Pizza Calabresa",
        "description": "Pizza com molho de tomate, mussarela e fatias de calabresa levemente apimentada.",
        "default_price": 14.99,
        "image_link": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROgKfg2NKJMDZYcAxgJOOv8QSmR1Y4aH8nFQ&s",
        "promotion": 1.50,
        "is_available": True,
        "type": "Pizza",
    },
    {
        "name": "Pizza Portuguesa",
        "description": "Pizza com molho de tomate, mussarela, presunto, ovos, cebola e azeitonas.",
        "default_price": 16.99,
        "image_link": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSqOoJyynGf6xP_IXCgMKBfDaJeCqmLhUpkg&s",
        "promotion": 2.00,
        "is_available": True,
        "type": "Pizza",
    },
    {
        "name": "Pizza de Frango com Catupiry",
        "description": "Pizza com molho de tomate, mussarela, frango desfiado e catupiry.",
        "default_price": 17.99,
        "image_link": "https://www.minhareceita.com.br/app/uploads/2020/09/Pizza-de-Frango-com-Catupiry-Caseira-desktop.jpg",
        "promotion": 3.00,
        "is_available": True,
        "type": "Pizza",
    },
    {
        "name": "Pizza de Bacon",
        "description": "Pizza com molho de tomate, mussarela e pedaços crocantes de bacon.",
        "default_price": 18.99,
        "image_link": "https://www.minhareceita.com.br/app/uploads/2022/10/pizza-de-bacon-portal-minha-receita.jpg",
        "promotion": 2.50,
        "is_available": True,
        "type": "Pizza",
    },
    {
        "name": "Pizza de Atum",
        "description": "Pizza com molho de tomate, mussarela e pedaços de atum fresco.",
        "default_price": 15.49,
        "image_link": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2IxSlJKR_7Svbm7fHRVCpkiFCTOauV6Xe1g&s",
        "promotion": 1.00,
        "is_available": True,
        "type": "Pizza",
    },
    {
        "name": "Pizza de Quatro Estações",
        "description": "Pizza dividida em quatro sabores: mussarela, calabresa, frango e vegetariana.",
        "default_price": 19.99,
        "image": "https://www.silviocicchi.com/pizzachef/wp-content/uploads/2015/01/quattro1.jpg",
        "promotion": 3.50,
        "is_available": True,
        "type": "Pizza",
    },
    {
        "name": "Pizza de Chocolate",
        "description": "Pizza doce com cobertura de chocolate ao leite e granulado.",
        "default_price": 12.99,
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXr7GvvpBVuaE0vDN53rTAWucNT387GiCr1Q&s",
        "promotion": 1.50,
        "is_available": True,
        "type": "Pizza",
    },
    {
        "name": "Pizza de Rúcula com Tomate Seco",
        "description": "Pizza com molho de tomate, mussarela, rúcula fresca e tomate seco.",
        "default_price": 18.49,
        "image": "https://i.ytimg.com/vi/H3YHp60XyLE/maxresdefault.jpg",
        "promotion": 2.50,
        "is_available": True,
        "type": "Pizza",
    },
]

# Adicionando os produtos ao banco de dados
for product in products:
    Product.objects.create(
        name=product["name"],
        description=product["description"],
        default_price=product["default_price"],  # Corrigido aqui
        image_link=product.get("image_link") or product.get("image"),  # Garante que usa o campo correto
        promotion=product["promotion"],
        is_available=product["is_available"],
    )
    print(f"Produto '{product['name']}' adicionado com sucesso!")
