from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.views import APIView

from apps.polling.serializers import VotingHistorySerializer


class VotingHistoryView(APIView):
    serializer_class = VotingHistorySerializer
    search_fields = []
    http_method_names = ["get"]
    permission_classes = [IsAuthenticated]

    def get_serializer(self, *args, **kwargs):
        serializer_class = self.serializer_class
        kwargs.setdefault(
            "context",
            {"request": self.request, "format": self.format_kwarg, "view": self},
        )
        return serializer_class(*args, **kwargs)

    def get(self, request, *args, **kwargs):
        elections = list(set(vote.election for vote in request.user.votes.all()))
        return Response(data=self.get_serializer(elections, many=True).data, status=HTTP_200_OK)
