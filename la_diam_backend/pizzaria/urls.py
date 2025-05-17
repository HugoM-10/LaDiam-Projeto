from django.urls import path
from .userProfile_views import (
    login_view,
    logout_view,
    user_view,
    signup_view,
    user_profile_view,
)
from .products_views import products_view
from .order_views import my_orders_view, orders_view, order_detail, update_order_status_view
from .comments_views import (
    comments_view,
    get_my_comments_view,
)
from .ratings_views import get_product_ratings_view, create_rating_view
from .message_views import UserMessagesView, ClearMessagesView

urlpatterns = [
    # User authentication views
    path("auth/login/", login_view),  # POST
    path("auth/logout/", logout_view),  # POST
    path("auth/signup/", signup_view),  # POST
    path("auth/user/", user_view),  # GET, PUT
    
    # User profile views
    path("profile/", user_profile_view),  # GET, PUT
    
    # Products views
    path("products/", products_view),  # GET, POST, PUT
    
    # Orders views
    path("orders/", orders_view),  # GET,
    path("orders/my/", my_orders_view),  # GET, POST
    path("orders/<int:order_id>/", order_detail),  # GET, PUT, DELETE
    path("orders/<int:order_id>/status/", update_order_status_view),  # PUT
    
    # Comments views
    path("comments/product/<int:product_id>/", comments_view),  # GET, POST
    path("comments/my/", get_my_comments_view),  # GET
    
    # Ratings views
    path("ratings/<int:product_id>/", get_product_ratings_view),
    path("ratings/", create_rating_view, name="create_rating"),
    
    # Messages views
    path("messages/", UserMessagesView.as_view(), name="user-messages"),  # GET, POST
    path("messages/clear/", ClearMessagesView.as_view(), name="clear-messages"),
]
