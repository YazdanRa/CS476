from typing import TYPE_CHECKING, List

from rest_framework import serializers

from apps.account.user.serializers import UserProxySerializer
from apps.polling.models import Vote, VoteOption
from apps.polling.serializers.election_serializer import ElectionSerializer

if TYPE_CHECKING:
    from apps.polling.models import Election


class RecordVoteSerializer(serializers.ModelSerializer):
    election = ElectionSerializer(read_only=True)
    voter = UserProxySerializer(read_only=True)
    selected_options = serializers.ListSerializer(
        child=serializers.PrimaryKeyRelatedField(queryset=VoteOption.objects.all()))

    class Meta:
        model = Vote
        exclude = ["id", "selected_option", "display_selected_option", "last_modified"]

    def validate_selected_options(self, selected_options: List[VoteOption]) -> List[VoteOption]:
        for selected_option in selected_options:
            if selected_option.election != self.context.get("election"):
                raise serializers.ValidationError(
                    "You can only select the option associated with the election you are voting for."
                )
        return selected_options

    def validate(self, data: dict) -> dict:
        data = super().validate(data)
        election: "Election" = self.context.get("election")
        if election.is_closed:
            raise serializers.ValidationError(
                "You can't vote for a closed election."
            )
        voter = self.context.get("voter")

        if Vote.objects.filter(election=election, voter=voter).exists():
            raise serializers.ValidationError(
                "You have already voted for this election."
            )

        # allowed_groups = election.associated_groups
        # user_groups = voter.groups.all()
        #
        # can_vote = False
        # for group in user_groups:
        #     if group in allowed_groups:
        #         can_vote = True
        #         break
        # if not can_vote:
        #     raise serializers.ValidationError(
        #         "You are not allowed to vote for this election."
        #     )

        data.update(election=election, voter=voter)
        return data

    def save(self, **kwargs):
        validated_data = {**self.validated_data, **kwargs}
        options = validated_data.pop("selected_options")

        for option in options:
            validated_data.update(selected_option=option)
            Vote.objects.create(**validated_data)
