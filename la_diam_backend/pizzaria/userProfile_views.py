from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User, Group
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Profile
from .serializers import ProfileSerializer
from .permissions import gestor_required

@api_view(['POST'])
def login_view(request):
    print(request.data)
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return Response({'message': 'Logged in successfully'})
    return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    print(f"Session Cookie: {request.COOKIES.get('sessionid')}")
    print(f"Before logout: User authenticated = {request.user.is_authenticated}")
    # Log out the user
    logout(request)
    # Log the user's authentication status after logout
    print(f"After logout: User authenticated = {request.user.is_authenticated}")

    return Response({'message': 'Logged out successfully'})

@api_view(['POST'])
def signup_view(request):
    print(request.data)
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')

    if username is None or password is None:
        return Response({'error': 'invalid username/password'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    #Get the group object
    try:
        group = Group.objects.get(name="Cliente")
    except Group.DoesNotExist:
        return Response({'error': 'Group does not exist'}, status=status.HTTP_400_BAD_REQUEST)


    user = User.objects.create_user(username=username, email=email, password=password)
    # Add the user to the group
    user.groups.add(group)

    user.save()
    Profile.objects.create(user=user)
    login(request, user)
    return Response({'message': 'User ' + username + ' created successfully'}, status=status.HTTP_201_CREATED)



@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def user_view(request):
    user = request.user

    if request.method == 'GET':
        group = user.groups.all().values_list()[0][1] if user.groups.exists() else None
        return Response({'username': user.username, 'email': user.email, 'group': group})

    elif request.method == 'PUT':
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        old_password = request.data.get('old_password')

        if not old_password: 
            return Response({'error': 'Old password is required'}, status=status.HTTP_400_BAD_REQUEST)
        if not user.check_password(old_password):
            return Response({'error': 'Old password is incorrect'}, status=status.HTTP_400_BAD_REQUEST)
        if username:
            if User.objects.filter(username=username).exists() and username != user.username:
                return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
            user.username = username
        if email:
            user.email = email
        if password:
            user.set_password(password)
        user.save()
        login(request, user)
        return Response({'username': user.username, 'email': user.email})   

@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def user_profile_view(request):
    profile = request.user.profile
    
    if request.method == 'GET':
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@gestor_required
def create_gestor_vendedor_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')
    group_name = request.data.get('group_name')

    if username is None or password is None:
        return Response({'error': 'invalid username/password'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    #Get the group object
    try:
        group = Group.objects.get(name=group_name)
    except Group.DoesNotExist:
        return Response({'error': 'Group does not exist'}, status=status.HTTP_400_BAD_REQUEST)


    user = User.objects.create_user(username=username, email=email, password=password)
    Profile.objects.create(user=user)
    
    # Add the user to the group
    user.groups.add(group)

    user.save()
    return Response({'message': 'User ' + username + ' created successfully'}, status=status.HTTP_201_CREATED)