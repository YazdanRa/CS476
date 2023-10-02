from django.contrib.auth.models import Group
from rest_framework.generics import ListAPIView

from apps.account.user.serializers import GroupSerializer


class GetGroupsView(ListAPIView):
    serializer_class = GroupSerializer
    queryset = Group.objects.all()
