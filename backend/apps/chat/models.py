import uuid
from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Conversation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=128)
    users = models.ManyToManyField(User, blank=True)
    avatar = models.URLField(blank=True, null=True)
    private = models.BooleanField(default=True)

    def get_users_count(self):
        return self.users.count()

    def join(self, user):
        self.users.add(user)
        self.save()

    def leave(self, user):
        self.users.remove(user)
        self.save()

    def __str__(self):
        return f"{self.name} ({self.get_users_count()})"


class Message(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    conversation = models.ForeignKey(
        Conversation, on_delete=models.CASCADE, related_name="messages"
    )
    sender = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="message_sender"
    )
    content = models.CharField(max_length=512)
    timestamp = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.from_user} -> {self.to_user}: {self.content}"
