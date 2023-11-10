from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.views import APIView

from apps.polling.serializers import ElectionProxySerializer


class VoteHistoryView(APIView):
    serializer_class = ElectionProxySerializer
    search_fields = []
    http_method_names = ["get"]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        elections = [vote.election for vote in request.user.votes.all()]
        return Response(data=self.serializer_class(elections, many=True).data, status=HTTP_200_OK)
