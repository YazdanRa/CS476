from rest_framework import serializers

from apps.account.user.models import User


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["full_name", "email", "password"]
        extra_kwargs = {
            "password": {"write_only": True},
        }
