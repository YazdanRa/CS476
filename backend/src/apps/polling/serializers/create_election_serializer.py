from datetime import datetime
from typing import List

from django.contrib.auth.models import Group
from rest_framework import serializers

from apps.account.user.serializers import GroupSerializer
from apps.polling.models import Election, VoteOption


class VoteOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoteOption
        fields = ["title", "description"]


class CreateElectionSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(max_length=256, allow_null=False, allow_blank=False)
    description = serializers.CharField(max_length=2048, allow_null=False, allow_blank=False)

    associated_groups = GroupSerializer(many=True, allow_empty=True)

    can_choose_multiple_options = serializers.BooleanField(allow_null=False)

    from_date = serializers.DateTimeField()
    to_date = serializers.DateTimeField()

    options = VoteOptionSerializer(many=True, allow_null=False, allow_empty=False)

    def validate_from_date(self, from_date: datetime) -> datetime:
        if from_date < datetime.now():
            raise serializers.ValidationError("The election must start in the future.")
        return from_date

    def validate_to_date(self, to_date: datetime) -> datetime:
        if to_date < datetime.now():
            raise serializers.ValidationError("The election must end in the future.")
        return to_date

    def validate_associated_groups(self, _groups: List[Group]) -> List[Group]:
        groups = list()
        for _group in _groups:
            try:
                group = Group.objects.get(**dict(_group))
                groups.append(group)
            except Group.DoesNotExist:
                raise serializers.ValidationError(f"Group does not exist.")
        return groups

    def validate(self, data: dict) -> dict:
        data = super().validate(data)
        if data.get("from_date") >= data.get("to_date"):
            raise serializers.ValidationError("The election must end after it starts.")

        return {**data, "creator": self.context.get("request").user}

    def create(self, validated_data: dict) -> Election:
        options = validated_data.pop("options")
        groups = validated_data.pop("associated_groups")

        election = Election.objects.create(**validated_data)
        for option in options:
            election.options.create(**option)

        for group in groups:
            election.associated_groups.add(group)

        return election