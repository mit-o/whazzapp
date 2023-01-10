from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.exceptions import ValidationError
from lib.firebase_storage import MAX_AVATAR_SIZE, FirebaseStorageHelper

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    upload_avatar = serializers.ImageField(
        use_url=True,
        required=False,
        write_only=True,
    )

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
            "upload_avatar",
            "avatar",
            "display_name",
        )
        lookup_field = "email"

        extra_kwargs = {
            "email": {"read_only": True},
            "is_active": {"read_only": True},
            "is_staff": {"read_only": True},
            "is_superuser": {"read_only": True},
            "created_at": {"read_only": True},
        }

    def validate_upload_avatar(self, value):
        if value and value.size > MAX_AVATAR_SIZE:
            size_in_MiB = MAX_AVATAR_SIZE / 1024 / 1024
            raise ValidationError(f"Please keep filesize under {size_in_MiB} MiB.")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data["email"],
        )

        user.set_password(validated_data["password"])
        user.save()
        return user

    def update(self, instance, validated_data):
        if "password" in validated_data:
            password = validated_data.pop("password", None)
            instance.set_password(password)
        return super().update(instance, validated_data)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if data["avatar"] is None:
            helper = FirebaseStorageHelper(None, "avatars/users")
            data["avatar"] = helper.get_default_avatar()
        return data


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "display_name",
            "avatar",
        )
        lookup_field = "display_name"

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if data["avatar"] is None:
            helper = FirebaseStorageHelper(None, "avatars/users")
            data["avatar"] = helper.get_default_avatar()
        return data


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
