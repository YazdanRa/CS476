from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_200_OK

from apps.polling.models import Election


class HasUserVotedView(GenericAPIView):
    """
    Returns whether the user has voted in the election.
    """
    election_model = Election
    permission_classes = [IsAuthenticated]

    def get_election(self, pk):
        try:
            return self.election_model.objects.get(pk=pk)
        except self.election_model.DoesNotExist:
            raise HTTP_404_NOT_FOUND

    def get(self, request, *args, **kwargs):
        election = self.get_election(pk=kwargs.get("pk"))
        return Response(
            data=dict(has_voted=election.has_voted(request.user), vote_id=election.get_vote_id(request.user)),
            status=HTTP_200_OK
        )
