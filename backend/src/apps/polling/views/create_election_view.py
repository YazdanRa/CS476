from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated

from apps.polling.serializers import ActionElectionSerializer


class CreateElectionView(CreateAPIView):
    """
    Create election gateway
    """

    permission_classes = [IsAuthenticated]
    serializer_class = ActionElectionSerializer
