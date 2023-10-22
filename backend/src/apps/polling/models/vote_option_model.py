from django.db import models
from django.utils.translation import gettext as _


class VoteOption(models.Model):
    election = models.ForeignKey(
        verbose_name=_("Election"),
        to="polling.Election",
        on_delete=models.CASCADE,
        related_name="options"
    )

    title = models.CharField(verbose_name=_("Title"), max_length=256, null=False, blank=False)
    description = models.TextField(verbose_name=_("Description"), max_length=2048, null=True, blank=True)

    date_created = models.DateTimeField(verbose_name=_("Created at"), auto_now_add=True)
    last_modified = models.DateTimeField(verbose_name=_("Last modified"), auto_now=True)

    class Meta:
        verbose_name = _("Vote Option")
        verbose_name_plural = _("Vote Options")

    def __str__(self) -> str:
        return f"{self.pk} | {self.title}"

    @property
    def votes_count(self) -> int:
        return self.votes.count()

    @property
    def vote_percentage(self) -> float:
        try:
            return round(self.votes_count / self.election.votes.count() * 100, 2)
        except ZeroDivisionError:
            return 0
