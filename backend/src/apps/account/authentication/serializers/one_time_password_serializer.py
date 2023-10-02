from rest_framework import serializers

from apps.account.authentication.models import OneTimePassword
from apps.account.user.models import User


class OneTimePasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = OneTimePassword
        fields = ["email", "code"]

    def validate(self, data):
        email = data.get("email")
        code = data.get("code")

        try:
            otp = OneTimePassword.objects.get(email=email, code=code)
        except OneTimePassword.DoesNotExist:
            raise serializers.ValidationError("Invalid email or code.")

        if otp.is_authenticated:
            raise serializers.ValidationError("Code has already been used.")

        if otp.is_expired():
            raise serializers.ValidationError("Code has expired. Please request a new one.")

        return otp

    def get_or_create_user(self) -> User:
        user, created = User.objects.get_or_create(email=self.validated_data.email)
        return user
