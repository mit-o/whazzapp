from django.contrib.auth import get_user_model
from rest_framework import generics, permissions, status
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import RetrieveModelMixin, ListModelMixin, UpdateModelMixin
from rest_framework.response import Response
from .serializers import RegisterSerializer, UserSerializer, UserListSerializer
from .permissions import IsOwnerOrAdmin

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


class UserViewSet(RetrieveModelMixin, ListModelMixin, UpdateModelMixin, GenericViewSet):
    serializer_class = UserSerializer

    def get_queryset(self):
        if self.action == "list":
            return User.objects.all().exclude(id=self.request.user.id)
        return User.objects.all()

    def get_serializer_class(self):
        if self.action == "list":
            return UserListSerializer
        return UserSerializer

    def get_permissions(self):
        if self.action == "list":
            self.permission_classes = [permissions.IsAuthenticated]
        if (
            self.action == "retrieve"
            or self.action == "update"
            or self.action == "partial_update"
        ):
            self.permission_classes = [IsOwnerOrAdmin]
        if self.action == "destroy":
            self.permission_classes = [permissions.IsAdminUser]

        return super(UserViewSet, self).get_permissions()


class CurrentUserView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def retrieve(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def update(self, request):
        serializer = self.serializer_class(request.user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request):
        serializer = self.serializer_class(
            request.user, data=request.data, partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
