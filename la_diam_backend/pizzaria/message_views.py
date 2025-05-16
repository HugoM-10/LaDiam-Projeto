from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Message
from .serializers import MessageSerializer

class UserMessagesView(generics.ListCreateAPIView):  # <--- Corrige aqui!
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Message.objects.filter(user=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ClearMessagesView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        Message.objects.filter(user=request.user).delete()
        return Response({"detail": "Mensagens apagadas com sucesso."})