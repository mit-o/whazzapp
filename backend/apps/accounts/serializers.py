from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import ValidationError

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "first_name",
            "last_name",
            "is_active",
            "is_staff",
            "is_superuser",
            "created_at",
        )
        lookup_field = "email"

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data["email"],
        )

        user.set_password(validated_data["password"])
        user.save()
        return user

    def update(self, instance, validated_data):
        instance.set_password(validated_data["password"])
        instance.save()
        return instance


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "email",
        )
        lookup_field = "email"
        


class RegisterSerializer(serializers.ModelSerializer):
    tokens = serializers.SerializerMethodField()
    confirm_password = serializers.CharField(
        style={"input_type": "password"}, write_only=True
    )

    class Meta:
        model = User
        fields = ("email", "password", "confirm_password", "tokens")

        extra_kwargs = {
            "password": {"write_only": True},
        }

    def validate(self, data):
        password = data.get("password")
        confirm_password = data.pop("confirm_password")
        if password != confirm_password:
            raise ValidationError(
                {"password": "Your password and confirmation password do not match."}
            )
        return data

    def get_tokens(self, user):
        tokens = RefreshToken.for_user(user)
        refresh = str(tokens)
        access = str(tokens.access_token)
        data = {"refresh": refresh, "access": access}
        return data

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        user.set_password(validated_data["password"])
        user.save()

        return user
