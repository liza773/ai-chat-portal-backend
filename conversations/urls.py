from django.urls import path
from . import views

urlpatterns = [
    path('conversations/', views.ConversationListCreateView.as_view(), name='conversation-list-create'),
    path('chat/', views.ChatAPIView.as_view(), name='chat-api'),
]
