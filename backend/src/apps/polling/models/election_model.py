from datetime import timedelta
from typing import TYPE_CHECKING, Dict, Any, List, Optional

from django.contrib.auth.models import Group
from django.db import models
from django.utils.timezone import now
from django.utils.translation import gettext as _

if TYPE_CHECKING:
    from apps.account.user.models import User
    from apps.polling.models import VoteOption


class Election(models.Model):
    class Status(models.TextChoices):
        UPCOMING = "UPCOMING", _("Upcoming")
        ACTIVE = "ACTIVE", _("Active")
        CLOSED = "CLOSED", _("Closed")
        UNKNOWN = "UNKNOWN", _("Unknown")

    title = models.CharField(verbose_name=_("Title"), max_length=256, null=False, blank=False)
    description = models.TextField(verbose_name=_("Description"), max_length=2048, null=True, blank=True)

    can_choose_multiple_options = models.BooleanField(
        verbose_name=_("Can choose multiple options"),
        default=False
    )

    creator = models.ForeignKey(
        verbose_name=_("Creator"),
        to="user.User",
        on_delete=models.CASCADE,
        related_name="elections"
    )

    associated_groups = models.ManyToManyField(
        verbose_name=_("Associated groups"),
        help_text=_("Groups that can vote in this election"),
        to=Group,
        related_name="elections",
        blank=True
    )

    from_date = models.DateTimeField(verbose_name=_("Start at"))
    to_date = models.DateTimeField(verbose_name=_("End at"))

    date_created = models.DateTimeField(verbose_name=_("Created at"), auto_now_add=True)
    last_modified = models.DateTimeField(verbose_name=_("Last modified"), auto_now=True)

    class Meta:
        verbose_name = _("Election")
        verbose_name_plural = _("Elections")
        ordering = ["-from_date"]

    def __str__(self) -> str:
        return f"{self.pk} Election | {self.title}"

    def get_status(self) -> Status:
        try:
            if self.from_date > now():
                return self.Status.UPCOMING
            elif self.to_date < now():
                return self.Status.CLOSED
            else:
                return self.Status.ACTIVE
        except TypeError:
            return self.Status.UNKNOWN

    @property
    def status(self) -> str:
        return self.get_status().label

    @property
    def duration(self) -> timedelta:
        try:
            return self.to_date - self.from_date
        except TypeError:
            return timedelta()

    @property
    def is_active(self) -> bool:
        return self.from_date <= now() <= self.to_date

    @property
    def is_upcoming(self) -> bool:
        return self.from_date > now()

    @property
    def is_closed(self) -> bool:
        return self.to_date < now()

    @property
    def options_top_to_bottom(self):
        return self.options.order_by("-votes__count")

    @property
    def winner(self) -> List["VoteOption"]:
        # TODO: Return if there are many winners
        return list(self.options_top_to_bottom.first())

    @property
    def statistics(self) -> Dict["VoteOption", Dict[str, Any]]:
        statistics = dict()
        for option in self.options.all():
            statistics[option] = dict(
                votes_count=option.votes_count,
                vote_percentage=option.vote_percentage
            )
        return statistics

    def has_voted(self, user: "User") -> bool:
        return self.votes.filter(voter=user).exists()

    def get_vote_id(self, user: "User") -> Optional[int]:
        from .vote_model import Vote
        try:
            return self.votes.get(voter=user).id
        except Vote.DoesNotExist:
            return None