from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST
from rest_framework.throttling import UserRateThrottle
from rest_framework.views import APIView

from apps.account.authentication.models import OneTimePassword
from apps.account.authentication.serializers import OneTimePasswordSerializer
from apps.account.authentication.serializers.one_time_password_serializer import OTPRequestSerializer
from apps.account.authentication.services import get_authorization_token
from apps.account.user.serializers import UserSerializer


class OTPBaseView(APIView):
    throttle_classes = [UserRateThrottle]
    http_method_names = ["post"]
    serializer_class = NotImplementedError

    def get_serializer(self, *args, **kwargs):
        serializer_class = self.serializer_class
        kwargs.setdefault(
            "context",
            {"request": self.request, "format": self.format_kwarg, "view": self},
        )
        return serializer_class(*args, **kwargs)


class RequestOneTimePasswordView(OTPBaseView):
    """
    One Time Email Code Login View
    """
    serializer_class = OTPRequestSerializer

    def post(self, request, *args, **kwargs):
        """
        Request One Time Email Code Login View
        """
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data["email"]
            OneTimePassword.objects.create(email=email)
            return Response(
                data=dict(
                    message="One Time Password has been sent to your email address.",
                )
            )


class ValidateOneTimePasswordView(OTPBaseView):
    serializer_class = OneTimePasswordSerializer

    def post(self, request, *args, **kwargs):
        """
        Validate One Time Email Code Login View
        """
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data.authenticate()
            user = serializer.get_or_create_user()
            return Response(
                data=dict(
                    message="You are successfully logged in",
                    token=get_authorization_token(user=user),
                    user=UserSerializer(instance=user).data,
                )
            )
        else:
            return Response(
                data=dict(error="Invalid email or code.", **serializer.errors),
                status=HTTP_400_BAD_REQUEST,
            )
