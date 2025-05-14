from django.urls import path
from .userProfile_views import (
    login_view,
    logout_view,
    user_view,
    signup_view,
    user_profile_view,
    edit_user_view,
)
from .products_views import get_products_view, create_product_view, edit_product_view
from .order_views import (
    create_order_view,
    get_order_view,
    get_all_orders_view,
    get_my_orders_view,
    edit_order_view,
    delete_order_view,
)
from .comments_views import (
    get_comments_view,
    create_comment_view,
    get_my_comments_view,
)
from .ratings_views import get_product_ratings_view, create_rating_view

urlpatterns = [
    # User authentication views
    path("auth/login/", login_view),
    path("auth/logout/", logout_view),
    path("auth/signup/", signup_view),
    path("auth/user/", user_view),
    path("auth/edit_user/", edit_user_view),
    
    # User profile views
    path("profile/", user_profile_view),
    
    # Products views
    path("products/", get_products_view),
    path("products/add/", create_product_view),
    path("products/edit/", edit_product_view),
   
    # Orders views
    path("orders/create/", create_order_view),
    path("orders/<int:order_id>/", get_order_view),
    path("orders/", get_all_orders_view),
    path("orders/my/", get_my_orders_view),
    path("orders/edit/<int:order_id>/", edit_order_view),
    path("orders/delete/<int:order_id>/", delete_order_view),

    # Comments views
    path("comments/", get_comments_view),
    path("comments/my/", get_my_comments_view),
    path("comments/product/<int:product_id>/", get_comments_view),
    path("comments/create/", create_comment_view),

    # Ratings views
    path("ratings/<int:product_id>/", get_product_ratings_view, name="get_product_ratings"),
    path("ratings/", create_rating_view, name="create_rating"),
]
