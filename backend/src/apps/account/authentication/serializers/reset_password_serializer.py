from django.utils.translation import gettext_lazy as _
from django.contrib.auth.password_validation import validate_password
from django.core.validators import RegexValidator
from rest_framework import serializers

from apps.account.user.models import User
from apps.account.authentication.models import RestPasswordRequest


class ResetPasswordRequestSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)

    class Meta:
        model = RestPasswordRequest
        fields = ["email"]

    def get_user(self) -> User:
        """
        check if user exists
        """
        try:
            return User.objects.get(email__iexact=self.data.get("email"))
        except User.DoesNotExist:
            raise serializers.ValidationError("User does not exist!")

    def create_request(self) -> RestPasswordRequest:
        return RestPasswordRequest.objects.create(user=self.get_user())


class ResetPasswordVerifySerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    auth_code = serializers.CharField(
        required=True,
        validators=[
            RegexValidator(
                regex=r"^[0-9]{6}$",
                message="Auth code should be 6 digits!",
                code="invalid_auth_code",
            )
        ],
        help_text=_("6 digits auth code!")
    )
    new_password = serializers.CharField(required=True)

    class Meta:
        model = RestPasswordRequest
        fields = ["email", "auth_code", "new_password"]

    def validate(self, data):
        """
        validate and return user instance!
        """
        data = super().validate(data)

        email = data.get("email")
        auth_code = data.get("auth_code")
        new_password = data.get("new_password")

        try:
            reset_password_request = RestPasswordRequest.objects.get(email=email)
        except RestPasswordRequest.DoesNotExist:
            raise serializers.ValidationError("You should request a reset password first!")

        if reset_password_request.is_expired() or reset_password_request.is_used():
            raise serializers.ValidationError("Reset password request has expired!")

        if reset_password_request.auth_code != auth_code:
            raise serializers.ValidationError("Invalid auth code!")

        validate_password(new_password)

        return data

