from rest_framework import serializers
from .models import Message, Conversation
from apps.accounts.serializers import UserListSerializer
from django.core.exceptions import ValidationError
from lib.firebase_storage import MAX_AVATAR_SIZE
from django.contrib.auth import get_user_model

User = get_user_model()


class ConversationSerializer(serializers.ModelSerializer):
    last_message = serializers.SerializerMethodField()
    participants = serializers.SerializerMethodField()
    upload_avatar = serializers.ImageField(
        use_url=True,
        required=False,
        write_only=True,
    )

    class Meta:
        model = Conversation
        fields = (
            "id",
            "name",
            "users",
            "participants",
            "last_message",
            "upload_avatar",
            "avatar",
            "private",
        )
        lookup_field = "id"
        extra_kwargs = {"users": {"write_only": True}}

    def validate_upload_avatar(self, value):
        if value and value.size > MAX_AVATAR_SIZE:
            size_in_MiB = MAX_AVATAR_SIZE / 1024 / 1024
            raise ValidationError(f"Please keep filesize under {size_in_MiB} MiB.")
        return value

    def get_last_message(self, obj):
        messages = obj.messages.all().order_by("-timestamp")
        if not messages:
            return None
        return MessageSerializer(messages[0]).data

    def get_participants(self, obj):
        return [UserListSerializer(user).data for user in obj.users.all()]


class createConversationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conversation
        fields = ("users", "private")
        extra_kwargs = {"users": {"write_only": True}}

    def validate(self, data):
        request_user = self.context["request"].user
        users = data.get("users", [])
        if request_user not in users:
            users.append(request_user)

        if len(users) < 2:
            raise ValidationError("Conversation must contain at least 2 users")
        elif len(users) == 2:
            data["name"] = ", ".join([user.display_name for user in users])
        elif len(users) >= 3:
            data["private"] = False
            first_users = f"{', '.join([user.display_name for user in users[:3]])}"
            if len(users) == 3:
                data["name"] = first_users
            else:
                data["name"] = f"{first_users} and {len(users) - 3} others"
        return data

    def create(self, validated_data):
        users = validated_data.pop("users", [])
        private_conversation = None

        if len(users) == 2:
            users_query = [user.id for user in users]
            private_conversations = Conversation.objects.filter(private=True)
            for conversation in private_conversations:
                conversation_users = [user.id for user in conversation.users.all()]
                if set(conversation_users) == set(users_query):
                    private_conversation = conversation
                    break
        if private_conversation:
            return private_conversation

        conversation = Conversation.objects.create(**validated_data)
        conversation.users.set(users)
        return conversation


class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.SerializerMethodField()
    conversation = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = (
            "id",
            "conversation",
            "sender",
            "content",
            "timestamp",
            "read",
        )

    def get_conversation(self, obj):
        return str(obj.conversation.id)

    def get_sender(self, obj):
        return UserListSerializer(obj.sender).data
