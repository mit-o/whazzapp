from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r"conversations", views.ConversationViewSet, basename="conversations")


urlpatterns = []
urlpatterns += router.urls
