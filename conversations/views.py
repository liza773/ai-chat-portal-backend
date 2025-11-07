from rest_framework import generics
from .models import Conversation
from .serializers import ConversationSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests


# 🗂 Handles saving and retrieving conversations
class ConversationListCreateView(generics.ListCreateAPIView):
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer


# 💬 Handles sending chat requests to LM Studio
class ChatAPIView(APIView):
    def post(self, request):
        user_message = request.data.get("message", "")
        if not user_message:
            return Response({"error": "Message is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Connect to LM Studio running locally (http://localhost:1234)
        try:
            response = requests.post(
                "http://localhost:1234/v1/chat/completions",
                json={
                    "model": "mistral",  # Change model name if needed
                    "messages": [
                        {"role": "user", "content": user_message}
                    ]
                }
            )
            ai_response = response.json()
            reply = ai_response["choices"][0]["message"]["content"]
        except Exception as e:
            print("Error contacting LM Studio:", e)
            reply = "Sorry, AI is not responding. Please ensure LM Studio is running."

        return Response({"reply": reply}, status=status.HTTP_200_OK)
