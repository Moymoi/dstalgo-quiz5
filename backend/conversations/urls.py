from django.urls import path
from . import views

urlpatterns = [
    path('conversation/', views.chat_view, name='chat'),
    path('conversations/', views.conversation_list_view, name='conversation-list'),
    path('conversations/<str:pk>/', views.conversation_detail_view, name='conversation-detail'),
]
