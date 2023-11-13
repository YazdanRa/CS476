from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import IsAuthenticated

from apps.account.user.serializers import UserSerializer


class UpdateUserView(UpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
