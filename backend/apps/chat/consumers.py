from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer
from .models import Conversation, Message
from .serializers import MessageSerializer
from django.contrib.auth import get_user_model
import json
from uuid import UUID

User = get_user_model()


class UUIDEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, UUID):

            return obj.hex
        return json.JSONEncoder.default(self, obj)


class ChatConsumer(JsonWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        self.user = None
        self.conversation_id = None
        self.conversation = None

    def connect(self):
        self.user = self.scope["user"]
        if not self.user.is_authenticated:
            return

        self.accept()

        self.conversation_id = f"{self.scope['url_route']['kwargs']['conversation_id']}"
        self.conversation = Conversation.objects.get(id=self.conversation_id)
        async_to_sync(self.channel_layer.group_add)(
            self.conversation_id, self.channel_name
        )
        self.send_json(
            {
                "type": "welcome_message",
                "message": "Hey there! You've successfully connected!",
            }
        )

        messages = self.conversation.messages.all().order_by("-timestamp")[0:50]
        self.send_json(
            {
                "type": "last_50_messages",
                "messages": MessageSerializer(messages, many=True).data,
            }
        )

    def disconnect(self, code):
        print("Disconnected!")
        return super().disconnect(code)

    def receive_json(self, content, **kwargs):
        message_type = content["type"]
        if message_type == "chat_message":
            message = Message.objects.create(
                sender=self.user,
                content=content["message"],
                conversation=self.conversation,
            )

            async_to_sync(self.channel_layer.group_send)(
                self.conversation_id,
                {
                    "type": "chat_message_echo",
                    "name": self.user.display_name,
                    "message": MessageSerializer(message).data,
                },
            )

        return super().receive_json(content, **kwargs)

    def chat_message_echo(self, event):
        print(event)
        self.send_json(event)

    @classmethod
    def encode_json(cls, content):
        return json.dumps(content, cls=UUIDEncoder)
