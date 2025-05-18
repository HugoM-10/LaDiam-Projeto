# message_views.py
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Message
from .serializers import MessageSerializer

@api_view(["GET", "POST"])
@permission_classes([permissions.IsAuthenticated])
def user_messages_view(request):
    if request.method == "GET":
        messages = Message.objects.filter(user=request.user).order_by("-created_at")
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def clear_messages_view(request):
    Message.objects.filter(user=request.user, new=True).update(new=False)
    return Response({"detail": "Mensagens marcadas como lidas com sucesso."})

@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def unread_message_count(request):
    count = Message.objects.filter(user=request.user, new=True).count()
    return Response({"unread_count": count})
