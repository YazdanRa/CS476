from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.views import APIView
from rest_framework.response import Response

from apps.account.authentication.serializers import ResetPasswordRequestSerializer, ResetPasswordVerifySerializer


class ResetPasswordRequestView(APIView):
    """
    This view is used to request a password reset.
    Will email the user with a code/link to reset the password.
    """

    http_method_names = ["post"]
    serializer_class = ResetPasswordRequestSerializer

    def get_serializer(self, *args, **kwargs):
        serializer_class = self.serializer_class
        kwargs.setdefault(
            "context",
            {"request": self.request, "format": self.format_kwarg, "view": self},
        )
        return serializer_class(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=dict(message="Reset password code has been sent to your email"), status=HTTP_200_OK)
        else:
            return Response(data=dict(message=serializer.errors), status=HTTP_400_BAD_REQUEST)


class ResetPasswordVerifyView(APIView):
    """
    This view is used to verify a password reset.
    Verify the auth_code and the email to reset the password.
    """

    http_method_names = ["post"]
    serializer_class = ResetPasswordVerifySerializer

    def get_serializer(self, *args, **kwargs):
        serializer_class = self.serializer_class
        kwargs.setdefault(
            "context",
            {"request": self.request, "format": self.format_kwarg, "view": self},
        )
        return serializer_class(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.set_new_password()
            return Response(data=dict(message="Your password successfully updated!"), status=HTTP_200_OK)
