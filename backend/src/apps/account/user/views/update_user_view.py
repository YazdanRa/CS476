from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT
from rest_framework.views import APIView

from apps.account.user.serializers import UserSerializer


class UpdateUserView(UpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


class ProfilePictureUploadView(APIView):
    http_method_names = ["post"]
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def post(self, request, *args, **kwargs):
        user = self.get_object()
        user.profile_picture = request.FILES.get("profile_picture")
        user.save()
        return Response(status=HTTP_204_NO_CONTENT)
