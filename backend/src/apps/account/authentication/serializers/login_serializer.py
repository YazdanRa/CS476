from django.utils.translation import gettext as _
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed, PermissionDenied

from apps.account.user.models import User


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True, allow_null=False, allow_blank=False)
    password = serializers.CharField(required=True, allow_null=False, allow_blank=False)

    def validate(self, data):
        """
        validate and return user instance!
        """
        email = data.get("email")
        password = data.get("password")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise AuthenticationFailed(
                detail=dict(email=_("User with this email does not exist.")),
                code="user-not-found",
            )

        if not user.check_password(raw_password=password):
            raise AuthenticationFailed(
                detail=dict(password=_("Password is incorrect")),
                code="incorrect-password",
            )

        if not user.is_active:
            raise PermissionDenied(
                detail=_("Your account is inactive. Please contact support team."),
                code="inactive-user",
            )

        return user
