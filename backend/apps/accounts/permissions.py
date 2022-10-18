from rest_framework import permissions


class IsOwnerOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, obj):
        return obj.username == request.user or request.user.is_superuser
