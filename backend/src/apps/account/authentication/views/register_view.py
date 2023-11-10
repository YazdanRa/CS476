from rest_framework.response import Response
from rest_framework.views import APIView

from apps.account.authentication.serializers import RegisterSerializer
from apps.account.authentication.services import get_authorization_token
from apps.account.user.serializers import UserSerializer


class RegisterView(APIView):
    """
    Register users gateway
    """

    serializer_class = RegisterSerializer
    http_method_names = ["post"]

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
            user = serializer.save()
            return Response(
                data=dict(
                    message="You are successfully registered.",
                    token=get_authorization_token(user=user),
                    user=UserSerializer(instance=user).data,
                )
            )
