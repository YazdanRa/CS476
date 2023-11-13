from rest_framework.generics import CreateAPIView

from apps.polling.serializers import ActionElectionSerializer


class CreateElectionView(CreateAPIView):
    """
    Create election gateway
    """

    serializer_class = ActionElectionSerializer
