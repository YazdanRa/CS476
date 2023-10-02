from django.utils.translation import gettext as _
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.account.authentication.services import remove_authorization_token


class LogoutView(APIView):
    """
    Logout user
    """

    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        remove_authorization_token(user=request.user)
        return Response(data=dict(message=_("You are successfully logged out")))
