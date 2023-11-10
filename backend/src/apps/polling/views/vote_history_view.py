from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from apps.polling.serializers import ElectionProxySerializer


class VoteHistoryView(APIView):
    serializer_class = ElectionProxySerializer
    search_fields = []
    http_method_names = ["GET"]
    authentication_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        elections = [vote.election for vote in request.user.votes.all()]
        return self.serializer_class(elections, many=True).data
