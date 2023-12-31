from rest_framework import serializers

from apps.account.user.models import User


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["profile_picture", "full_name", "email", "password", "date_of_birth"]
        extra_kwargs = {
            "password": {"write_only": True},
        }
