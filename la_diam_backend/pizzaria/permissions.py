from django.contrib.auth.decorators import user_passes_test
from django.http import JsonResponse
from django.contrib.auth.models import User, Group


#Check if the user is a "Vendedor" or "Gestor"
def is_vendedor_or_gestor(user):
    return user.is_superuser or (user.is_authenticated and user.groups.filter(name__in=['Vendedor', 'Gestor']).exists())


#Check if the user is a "Gestor"

def is_gestor(user):
    return user.is_superuser or (user.is_authenticated and user.groups.filter(name='Gestor').exists())


# Decorator to check if the user is "Vendedor" or "Gestor"
def vendedor_or_gestor_required(view_func):
    def wrapper(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({'error': 'User is not authenticated'}, status=401)
        if not is_vendedor_or_gestor(request.user):
            return JsonResponse({'error': 'Permission denied'}, status=403)
        return view_func(request, *args, **kwargs)
    return wrapper

# Decorator to check if the user is "Gestor"
def gestor_required(view_func):
    def wrapper(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({'error': 'User is not authenticated'}, status=401)
        if not is_gestor(request.user):
            return JsonResponse({'error': 'Permission denied'}, status=403)
        return view_func(request, *args, **kwargs)
    return wrapper