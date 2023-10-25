from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_404_NOT_FOUND
from rest_framework.views import APIView

from apps.polling.models import Election
from apps.polling.serializers import RecordVoteSerializer


class RecordVoteView(APIView):
    election_model = Election
    serializer_class = RecordVoteSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ["post"]

    def get_serializer(self, *args, **kwargs):
        serializer_class = self.serializer_class
        kwargs.setdefault(
            "context", {"request": self.request, "user": self.request.user, "format": self.format_kwarg, "view": self}
        )
        return serializer_class(*args, **kwargs)

    def get_election(self, pk):
        try:
            return self.election_model.objects.get(pk=pk)
        except self.election_model.DoesNotExist:
            raise HTTP_404_NOT_FOUND

    def post(self, request, *args, **kwargs):
        election = self.get_election(pk=kwargs.get("pk"))
        serializer = self.get_serializer(data=request.data)
        serializer.context.update(election=election, voter=request.user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(data=dict(message="Your vote successfully recorded.", **serializer.data), status=HTTP_200_OK)
