from django.db import models
from django.utils.translation import gettext as _


class Vote(models.Model):
    voter = models.ForeignKey(
        verbose_name=_("Voter"),
        to="user.User",
        related_name="votes",
        on_delete=models.CASCADE
    )

    election = models.ForeignKey(
        verbose_name=_("Election"),
        to="polling.Election",
        related_name="votes",
        on_delete=models.CASCADE
    )

    selected_option = models.ForeignKey(
        verbose_name=_("Vote for"),
        to="polling.VoteOption",
        on_delete=models.PROTECT,
        null=False,
        blank=False,
        related_name="votes"
    )

    date_voted = models.DateTimeField(verbose_name=_("Voted at"), auto_now_add=True)
    last_modified = models.DateTimeField(verbose_name=_("Last modified"), auto_now=True)

    class Meta:
        verbose_name = _("Vote")
        verbose_name_plural = _("Votes")

    def __str__(self) -> str:
        return f"{self.voter} voted for {self.selected_option}"
