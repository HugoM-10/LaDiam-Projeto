from django.urls import path
from .views import login_view, logout_view, user_view, signup_view

urlpatterns = [
    path('auth/login/', login_view),
    path('auth/logout/', logout_view),
    path('auth/signup/', signup_view),
    path('auth/user/', user_view),
]
