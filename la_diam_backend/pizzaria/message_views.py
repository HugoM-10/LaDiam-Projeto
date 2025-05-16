from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Message
from .serializers import MessageSerializer

class UserMessagesView(generics.ListCreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Retorna apenas mensagens novas (new=True)
        return Message.objects.filter(user=self.request.user, new=True).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ClearMessagesView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        # Marca todas as mensagens do utilizador como não novas (new=False)
        Message.objects.filter(user=request.user, new=True).update(new=False)
        return Response({"detail": "Mensagens marcadas como lidas com sucesso."})