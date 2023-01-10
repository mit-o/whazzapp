from django.contrib.auth import get_user_model
from lib.firebase_storage import FirebaseStorageHelper
from rest_framework import generics, permissions, status
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import RetrieveModelMixin, ListModelMixin, UpdateModelMixin
from rest_framework.response import Response
from rest_framework.decorators import action
from core.settings import firebase_user, firebase_storage
from .serializers import RegisterSerializer, UserSerializer, UserListSerializer
from .permissions import IsOwnerOrAdmin
from secrets import token_hex

User = get_user_model()


class RegisterView(generics.CreateAPIView):
    model = User
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )


class ListUsersView(generics.ListAPIView):
    serializer_class = UserListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return User.objects.all().exclude(id=self.request.user.id)


class CurrentUserView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def retrieve(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def update(self, request):
        serializer = self.serializer_class(request.user, data=request.data)

        uploaded_avatar = request.data.get("upload_avatar")

        if serializer.is_valid():
            if uploaded_avatar:
                helper = FirebaseStorageHelper(request.user.id, "avatars/users")
                helper.delete_old_avatars()
                avatar_url = helper.upload_avatar(uploaded_avatar)
                serializer.validated_data["avatar"] = avatar_url
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request):
        serializer = self.serializer_class(
            request.user, data=request.data, partial=True
        )

        uploaded_avatar = request.data.get("upload_avatar")

        if serializer.is_valid():
            if uploaded_avatar:
                helper = FirebaseStorageHelper(request.user.id, "avatars/users")
                helper.delete_old_avatars()
                avatar_url = helper.upload_avatar(uploaded_avatar)
                serializer.validated_data["avatar"] = avatar_url
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
