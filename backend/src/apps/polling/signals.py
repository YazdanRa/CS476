from typing import TYPE_CHECKING

from django.dispatch import receiver, Signal

if TYPE_CHECKING:
    from apps.polling.models import Election

election_finished = Signal(use_caching=True)


@receiver(election_finished)
def on_election_finished(sender, **kwargs):
    election: "Election" = kwargs.get("election")
    election.creator.send_email(
        subject=f"Election {election.title} finished",
        message=f"Election {election.title} finished, check out the results on the website!"
    )
