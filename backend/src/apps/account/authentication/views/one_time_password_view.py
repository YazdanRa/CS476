from django.conf import settings
from django.utils.timezone import now
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_429_TOO_MANY_REQUESTS
from rest_framework.views import APIView

from apps.account.authentication.models import OneTimePassword
from apps.account.authentication.serializers import OneTimePasswordSerializer
from apps.account.authentication.services import get_authorization_token
from apps.account.user.serializers import UserSerializer


class RequestOneTimePasswordView(APIView):
    """
    One Time Email Code Login View
    """

    http_method_names = ["post"]

    def post(self, request, *args, **kwargs):
        """
        Request One Time Email Code Login View
        """
        email = request.data.get("email").lower()
        try:
            if email.split("@")[1] != "uregina.ca":
                raise ValueError
        except IndexError:
            return Response(
                data=dict(error="Plase enter a valid email address."),
                status=HTTP_400_BAD_REQUEST
            )
        except ValueError:
            return Response(
                data=dict(error="You must use a University of Regina email address."),
                status=HTTP_400_BAD_REQUEST
            )
        except:
            return Response(
                data=dict(error="Invalid email address."),
                status=HTTP_400_BAD_REQUEST
            )

        if (
                OneTimePassword.objects.filter(
                    email=email,
                    date_created__gte=now() - settings.AUTH_EMAIL_LIMIT_DAY,
                ).count()
                > settings.AUTH_EMAIL_LIMIT_COUNT
        ):
            return Response(
                data=dict(error="You tried too many times to get the auth code. Please try again later."),
                status=HTTP_429_TOO_MANY_REQUESTS
            )

        email_auth = OneTimePassword.objects.create(email=email)
        return Response(
            data=dict(
                message="One Time Password has been sent to your email address.",
            )
        )


class ValidateOneTimePasswordView(APIView):
    http_method_names = ["post"]

    def post(self, request, *args, **kwargs):
        """
        Validate One Time Email Code Login View
        """
        serializer = OneTimePasswordSerializer(data=request.data)
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
