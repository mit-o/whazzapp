from rest_framework import serializers
from .models import Message, Conversation
from apps.accounts.serializers import UserSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


class ConversationSerializer(serializers.ModelSerializer):
    last_message = serializers.SerializerMethodField()
    participants = serializers.SerializerMethodField()

    class Meta:
        model = Conversation
        fields = ("id", "name", "users", "participants", "last_message")
        extra_kwargs = {"users": {"write_only": True}}

    def get_last_message(self, obj):
        messages = obj.messages.all().order_by("-timestamp")
        if not messages.exists():
            return None
        message = messages[0]
        return MessageSerializer(message).data

    def get_participants(self, obj):
        return [UserSerializer(user).data for user in obj.users.all()]


class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.SerializerMethodField()
    receiver = serializers.SerializerMethodField()
    conversation = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = (
            "id",
            "conversation",
            "sender",
            "receiver",
            "content",
            "timestamp",
            "read",
        )

    def get_conversation(self, obj):
        return str(obj.conversation.id)

    def get_sender(self, obj):
        return UserSerializer(obj.sender).data

    def get_receiver(self, obj):
        return UserSerializer(obj.receiver).data
