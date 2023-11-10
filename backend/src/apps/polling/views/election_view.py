from rest_framework.generics import ListAPIView, RetrieveAPIView

from apps.polling.models import Election
from apps.polling.serializers import ElectionSerializer, ElectionProxySerializer


class MyElectionsListView(ListAPIView):
    serializer_class = ElectionProxySerializer
    search_fields = []

    def get_queryset(self):
        return Election.objects.filter(creator=self.request.user)


class ElectionDetailView(RetrieveAPIView):
    serializer_class = ElectionSerializer
    queryset = Election.objects.all()
