import os
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from openai import OpenAI

from .models import Conversation, Message
from .serializers import ConversationSerializer

SYSTEM_PROMPT = (
    "You are an acronym deciphering assistant. "
    "Your ONLY job is to expand acronyms — provide the full words each letter stands for. "
    "Do NOT explain the concept, provide history, background, or any additional information. "
    "If the user inputs something that is not an acronym, respond with: "
    "'Please provide an acronym to decipher.' "
    "Output the expanded form only, nothing else."
)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def chat_view(request):
    user_message = request.data.get('message', '').strip()
    conversation_id = request.data.get('conversation_id', None)

    if not user_message:
        return Response({'error': 'Message is required.'}, status=status.HTTP_400_BAD_REQUEST)

    if conversation_id:
        try:
            conversation = Conversation.objects.get(_id=conversation_id, user=request.user)
        except Conversation.DoesNotExist:
            return Response({'error': 'Conversation not found.'}, status=status.HTTP_404_NOT_FOUND)
    else:
        conversation = Conversation.objects.create(
            user=request.user,
            title=user_message[:60],
        )

    Message.objects.create(conversation=conversation, role='user', content=user_message)

    history = conversation.messages.all()
    messages_for_api = [{'role': 'system', 'content': SYSTEM_PROMPT}]
    for msg in history:
        messages_for_api.append({'role': msg.role, 'content': msg.content})

    api_key = getattr(settings, 'OPENAI_API_KEY', '')
    if not api_key:
        assistant_content = (
            "[Demo mode — no API key configured] "
            "This bot deciphers acronyms only. Example: NASA → National Aeronautics and Space Administration."
        )
    else:
        try:
            client = OpenAI(api_key=api_key)
            completion = client.chat.completions.create(
                model='gpt-4o-mini',
                messages=messages_for_api,
            )
            assistant_content = completion.choices[0].message.content.strip()
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

    Message.objects.create(
        conversation=conversation, role='assistant', content=assistant_content
    )

    serializer = ConversationSerializer(conversation)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def conversation_list_view(request):
    conversations = Conversation.objects.filter(user=request.user)
    serializer = ConversationSerializer(conversations, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def conversation_detail_view(request, pk):
    try:
        conversation = Conversation.objects.get(_id=pk, user=request.user)
    except Conversation.DoesNotExist:
        return Response({'error': 'Conversation not found.'}, status=status.HTTP_404_NOT_FOUND)

    serializer = ConversationSerializer(conversation)
    return Response(serializer.data)
