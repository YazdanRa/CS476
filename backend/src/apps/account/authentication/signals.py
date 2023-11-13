from django.contrib.auth import user_login_failed
from django.contrib.auth.models import User
from django.dispatch import receiver


@receiver(user_login_failed)
def on_failed_login(sender, **kwargs):
    try:
        user = User.objects.get_by_natural_key(kwargs["credentials"]["email"])
    except User.DoesNotExist:
        return

    user.send_email(
        subject="Login failed",
        template_name="login_failed",
        context={"user": user, "ip_address": kwargs["request"].META["REMOTE_ADDR"]},
    )
