from datetime import datetime
from typing import List

from django.contrib.auth.models import Group
from rest_framework import serializers

from apps.account.user.serializers import GroupSerializer
from apps.polling.models import Election
from apps.polling.serializers.election_serializer import VoteOptionSerializer


class ActionElectionSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(max_length=256, allow_null=False, allow_blank=False)

    associated_groups = GroupSerializer(many=True, allow_empty=True)

    can_choose_multiple_options = serializers.BooleanField(allow_null=False, default=False)
    show_results_after_election = serializers.BooleanField(allow_null=False, default=False)

    access_code = serializers.CharField(read_only=True)

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

    def update(self, instance: Election, validated_data: dict) -> Election:
        options = validated_data.pop("options")
        groups = validated_data.pop("associated_groups")

        instance.title = validated_data.get("title", instance.title)
        instance.can_choose_multiple_options = validated_data.get("can_choose_multiple_options", instance.can_choose_multiple_options)
        instance.show_results_after_election = validated_data.get("show_results_after_election", instance.show_results_after_election)
        instance.from_date = validated_data.get("from_date", instance.from_date)
        instance.to_date = validated_data.get("to_date", instance.to_date)

        instance.options.all().delete()
        for option in options:
            instance.options.get_or_create(**option)

        instance.associated_groups.clear()
        for group in groups:
            instance.associated_groups.add(group)

        instance.save()
        return instance
