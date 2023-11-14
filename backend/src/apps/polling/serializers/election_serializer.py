from django.utils.timezone import now

from rest_framework import serializers

from apps.account.user.serializers import UserProxySerializer
from apps.polling.models import Election, VoteOption


class ElectionProxySerializer(serializers.ModelSerializer):
    status = serializers.ReadOnlyField()

    class Meta:
        model = Election
        fields = ["id", "title", "from_date", "to_date", "status"]


class ElectionProxyWithAccessCodeSerializer(ElectionProxySerializer):
    access_code = serializers.ReadOnlyField()

    class Meta:
        model = Election
        fields = ["id", "title", "from_date", "to_date", "status", "access_code"]


class VoteOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoteOption
        fields = ["id", "title"]


class VoteOptionWithResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoteOption
        fields = ["id", "title", "description", "votes_count", "vote_percentage"]


class ElectionSerializer(serializers.ModelSerializer):
    status = serializers.ReadOnlyField()
    creator = UserProxySerializer(read_only=True)
    vote_options = serializers.SerializerMethodField(read_only=True)
    creator = serializers.ReadOnlyField(source="creator.full_name")

    class Meta:
        model = Election
        include = ["Status", "can_vote", "vote_options"]
        exclude = ["date_created", "last_modified"]

    def get_vote_options(self, obj):
        return VoteOptionSerializer(obj.options_list, many=True).data


class ElectionResultsSerializer(ElectionSerializer):
    vote_options = serializers.SerializerMethodField(read_only=True)

    def get_vote_options(self, obj):
        return VoteOptionWithResultSerializer(obj.options_list, many=True).data

class VotingHistorySerializer(ElectionSerializer):
    my_vote = serializers.SerializerMethodField(read_only=True)
    winners = VoteOptionWithResultSerializer(read_only=True, many=True)

    class Meta:
        model = Election
        fields = ["id", "title", "from_date", "to_date", "my_vote", "winners"]

    def get_my_vote(self, obj):
        return VoteOptionSerializer(
            instance=[vote.selected_option for vote in obj.votes.filter(voter=self.context.get("request").user)],
            many=True
        ).data
