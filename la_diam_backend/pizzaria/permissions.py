from django.contrib.auth.decorators import user_passes_test

#Check if the user is a "Vendedor" or "Gestor"
def is_vendedor_or_gestor(user):
    return user.groups.filter(name__in=['Vendedor', 'Gestor']).exists()


#Check if the user is a "Gestor"

def is_gestor(user):
    return user.groups.filter(name='Gestor').exists()


#Decorator to check if the user is a "Vendedor" or "Gestor"

def vendedor_or_gestor_required(view_func):
    decorated_view = user_passes_test(
        is_vendedor_or_gestor,
        login_url='/login/',
        redirect_field_name=None
    )
    return decorated_view(view_func)


def gestor_required(view_func):
    decorated_view = user_passes_test(
        is_gestor,
        login_url='/login/',
        redirect_field_name=None
    )
    return decorated_view(view_func)