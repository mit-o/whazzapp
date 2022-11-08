from django.urls import include, path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenObtainPairView,
    TokenBlacklistView,
)
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r"users", views.UserViewSet, basename="users")

urlpatterns = [
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("token/blacklist/", TokenBlacklistView.as_view(), name="token_blacklist"),
    path("register/", views.RegisterView.as_view(), name="register"),
    path("me/", views.CurrentUserView.as_view(), name="current_user"),
]

urlpatterns += router.urls
