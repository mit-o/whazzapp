from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, CreateModelMixin
from rest_framework.viewsets import GenericViewSet
from rest_framework import permissions, status
from rest_framework.response import Response
from .models import Conversation, Message
from .serializers import ConversationSerializer, createConversationSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


class ConversationViewSet(
    ListModelMixin, RetrieveModelMixin, CreateModelMixin, GenericViewSet
):
    serializer_class = ConversationSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Conversation.objects.none()
    lookup_field = "id"

    def get_queryset(self):
        queryset = Conversation.objects.filter(users=self.request.user.id)
        return queryset

    def get_serializer_context(self):
        return {"request": self.request, "user": self.request.user}

    def get_serializer_class(self):
        if self.action == "create":
            return createConversationSerializer
        return ConversationSerializer

    def create(self, request, *args, **kwargs):
        request_user = self.request.user.id
        users = request.data.get("users") or []
        name = ""

        updated_users = [request_user, *users] if request_user not in users else users
        if len(updated_users) < 3:
            name = f"{', '.join([User.objects.get(id=user).email for user in updated_users])}"
        else:
            name = f"{', '.join([User.objects.get(id=user).email for user in updated_users[:2]])} and {len(updated_users) - 2} others"

        updated_data = {**request.data, "name": name, "users": updated_users}

        serializer = self.get_serializer(data=updated_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            ConversationSerializer().to_representation(serializer.instance),
            status=status.HTTP_201_CREATED,
            headers=headers,
        )
