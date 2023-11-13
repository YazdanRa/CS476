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

    def validate_email(self, email):
        """
        validate email and return it!
        """
        if not User.objects.filter(email__iexact=email).exists():
            raise serializers.ValidationError("User does not exist!")
        return email


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
            reset_password_request = RestPasswordRequest.objects.get(email=email, auth_code=auth_code)
        except RestPasswordRequest.DoesNotExist:
            raise serializers.ValidationError("There is no reset password request with this credentials!")

        if reset_password_request.is_expired() or reset_password_request.is_used():
            raise serializers.ValidationError("Reset password request has expired!")

        validate_password(new_password)

        return data

    def set_new_password(self):
        """
        set new password for user!
        """
        email = self.validated_data.get("email")
        auth_code = self.validated_data.get("auth_code")
        reset_password_request = RestPasswordRequest.objects.get(email=email, auth_code=auth_code)

        new_password = self.validated_data.get("new_password")
        reset_password_request.user.set_password(new_password)
        reset_password_request.user.save()
        reset_password_request.set_used()
