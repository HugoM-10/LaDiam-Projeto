from django.urls import path
from .userProfile_views import login_view, logout_view, user_view, signup_view, user_profile_view, edit_user_view
from .products_views import get_products_view, add_product_view, edit_product_view
urlpatterns = [
    path('auth/login/', login_view),
    path('auth/logout/', logout_view),
    path('auth/signup/', signup_view),
    path('auth/user/', user_view),
    path('auth/edit_user/', edit_user_view),
    path('profile/', user_profile_view),
    path('products/', get_products_view),
    path('products/add/', add_product_view),
    path('products/edit/', edit_product_view),
]
