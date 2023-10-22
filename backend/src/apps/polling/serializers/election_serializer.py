from django.utils.timezone import now

from rest_framework import serializers

from apps.account.user.serializers import UserProxySerializer
from apps.polling.models import Election, VoteOption


class ElectionProxySerializer(serializers.ModelSerializer):
    status = serializers.ReadOnlyField()

    class Meta:
        model = Election
        fields = ["id", "title", "description", "from_date", "to_date", "status"]


class VoteOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoteOption
        fields = ["id", "title", "description"]


class ElectionSerializer(serializers.ModelSerializer):
    status = serializers.ReadOnlyField()
    creator = UserProxySerializer(read_only=True)
    vote_options = VoteOptionSerializer(many=True, read_only=True, source="options")
    can_vote = serializers.SerializerMethodField()
    creator = serializers.ReadOnlyField(source="creator.full_name")
    can_see_results = serializers.SerializerMethodField()

    class Meta:
        model = Election
        include = ["Status", "can_vote", "can_see_results"]
        exclude = ["date_created", "last_modified"]

    def get_can_vote(self, obj):
        # TODO: Check if the user is eligible to vote for this election.
        return obj.is_active and self.context.get("request").user.is_authenticated

    def get_can_see_results(self, obj: Election):
        return obj.to_date < now() and self.context.get("request").user == obj.creator
