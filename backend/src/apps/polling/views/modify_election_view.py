from rest_framework.generics import UpdateAPIView

from apps.polling.models import Election
from apps.polling.serializers import ActionElectionSerializer


class ModifyElectionView(UpdateAPIView):
    """
    Update election gateway
    """

    serializer_class = ActionElectionSerializer
    queryset = Election.objects.all()
    lookup_field = "pk"
