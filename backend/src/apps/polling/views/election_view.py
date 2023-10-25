from rest_framework.generics import ListAPIView, RetrieveAPIView

from apps.polling.models import Election
from apps.polling.serializers import ElectionSerializer, ElectionProxySerializer


class ElectionsListView(ListAPIView):
    serializer_class = ElectionProxySerializer
    search_fields = []
    queryset = Election.objects.all()


class ElectionDetailView(RetrieveAPIView):
    serializer_class = ElectionSerializer
    queryset = Election.objects.all()
