from django.urls import path
from apps.chat.consumers import ChatConsumer

websocket_urlpatterns = [
    path("", ChatConsumer.as_asgi()),
    path("<conversation_id>/", ChatConsumer.as_asgi()),
]
