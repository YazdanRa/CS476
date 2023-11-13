from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_425_TOO_EARLY

from apps.polling.models import Election
from apps.polling.serializers import ElectionSerializer, ElectionProxyWithAccessCodeSerializer


class MyElectionsListView(ListAPIView):
    serializer_class = ElectionProxyWithAccessCodeSerializer
    search_fields = []

    def get_queryset(self):
        return Election.objects.filter(creator=self.request.user)


class ElectionDetailByIdView(RetrieveAPIView):
    serializer_class = ElectionSerializer
    queryset = Election.objects.all()
    lookup_field = "pk"


class ElectionDetailByAccessCodeView(RetrieveAPIView):
    serializer_class = ElectionSerializer
    queryset = Election.objects.all()
    lookup_field = "access_code"

    def get(self, request, *args, **kwargs):
        election = self.get_object()
        if election.is_upcoming:
            return Response(data=dict(message="Election has not started yet"), status=HTTP_425_TOO_EARLY)
        return super().get(request, *args, **kwargs)
