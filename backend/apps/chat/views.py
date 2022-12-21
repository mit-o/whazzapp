from lib.firebase_storage import FirebaseStorageHelper
from rest_framework.mixins import (
    ListModelMixin,
    RetrieveModelMixin,
    CreateModelMixin,
    UpdateModelMixin,
)
from rest_framework.viewsets import GenericViewSet
from rest_framework import permissions, status
from rest_framework.response import Response
from .models import Conversation, Message
from .serializers import ConversationSerializer, createConversationSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


class ConversationViewSet(
    ListModelMixin,
    RetrieveModelMixin,
    CreateModelMixin,
    UpdateModelMixin,
    GenericViewSet,
):
    serializer_class = ConversationSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Conversation.objects.all()

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
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            ConversationSerializer().to_representation(serializer.instance),
            status=status.HTTP_201_CREATED,
            headers=headers,
        )

    def update(self, request, pk=None):
        serializer = self.serializer_class(data=request.data)

        uploaded_avatar = request.data.get("upload_avatar")

        if serializer.is_valid():
            if uploaded_avatar:
                helper = FirebaseStorageHelper(pk, "avatars/conversations")
                helper.delete_old_avatars()
                avatar_url = helper.upload_avatar(uploaded_avatar)
                serializer.validated_data["avatar"] = avatar_url
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, pk=None):
        conversation = self.get_object()
        serializer = self.serializer_class(
            conversation, data=request.data, partial=True
        )

        uploaded_avatar = request.data.get("upload_avatar")

        if serializer.is_valid():
            if uploaded_avatar:
                helper = FirebaseStorageHelper(pk, "avatars/conversations")
                helper.delete_old_avatars()
                avatar_url = helper.upload_avatar(uploaded_avatar)
                serializer.validated_data["avatar"] = avatar_url
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
