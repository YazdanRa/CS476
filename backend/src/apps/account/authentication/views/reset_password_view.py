from rest_framework.status import HTTP_200_OK
from rest_framework.views import APIView
from rest_framework.response import Response

from apps.account.authentication.serializers import ResetPasswordSerializer


class ResetPasswordView(APIView):
    http_method_names = ["post"]

    def post(self, request, *args, **kwargs):
        request_type = self.request.get_full_path().split("/")[-1]
        if request_type == "request":
            return ResetPasswordRequestView.as_view()(request, *args, **kwargs)
        elif request_type == "verify":
            return ResetPasswordVerifyView.as_view()(request, *args, **kwargs)


class ResetPasswordRequestView(APIView):
    """
    This view is used to request a password reset.
    Will email the user with a code/link to reset the password.
    """

    http_method_names = ["post"]
    serializer_class = ResetPasswordSerializer

    def get_serializer(self, *args, **kwargs):
        serializer_class = self.serializer_class
        kwargs.setdefault(
            "context",
            {"request": self.request, "format": self.format_kwarg, "view": self},
        )
        return serializer_class(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        reset_password_request = serializer.create_request()
        response_data = self.get_serializer(instance=reset_password_request).data
        del response_data["new_password"]
        return Response(data=response_data, status=HTTP_200_OK)


class ResetPasswordVerifyView(APIView):
    """
    This view is used to verify a password reset.
    Verify the auth_code and the email to reset the password.
    """

    http_method_names = ["post"]
    serializer_class = ResetPasswordSerializer

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
            serializer.set_new_password(new_password=self.request.data.get("new_password"))
            return Response(data=dict(message="Your password successfully updated!"), status=HTTP_200_OK)
