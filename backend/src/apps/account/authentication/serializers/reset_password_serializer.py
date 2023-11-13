from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.validators import RegexValidator
from rest_framework import serializers

from apps.account.authentication.models import RestPasswordRequest


class ResetPasswordSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    auth_code = serializers.CharField(
        validators=[
            RegexValidator(
                regex=r"^[0-9]{6}$",
                message="Auth code should be 6 digits!",
                code="invalid_auth_code",
            )
        ]
    )

    class Meta:
        model = RestPasswordRequest
        fields = ["email", "auth_code"]

    def validate(self, data):
        """
        validate and return user instance!
        """
        email = data.get("email")
        auth_code = data.get("auth_code")

        try:
            reset_password_request = RestPasswordRequest.objects.get(email=email)
        except RestPasswordRequest.DoesNotExist:
            raise serializers.ValidationError("You should request a reset password first!")

        if reset_password_request.is_expired() or reset_password_request.is_used():
            raise serializers.ValidationError("Reset password request has expired!")

        if reset_password_request.auth_code != auth_code:
            raise serializers.ValidationError("Invalid auth code!")

        return data

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

    def set_new_password(self, new_password: str):
        """
        update password
        """
        validate_password(new_password)
        self.instance.user.set_password(new_password)
        self.instance.user.save()
