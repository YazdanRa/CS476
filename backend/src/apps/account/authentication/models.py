from django.db import models
from django.utils import timezone
from django.conf import settings

from django.utils.translation import gettext_lazy as _

from apps.account.user.models import User
from apps.account.authentication.managers import OneTimePasswordManager, ResetPasswordManager


def random_auth_code_string():
    from random import randint

    return str(randint(100000, 999999))


class OneTimePassword(models.Model):
    """Email Authentication Model"""

    email = models.EmailField(
        verbose_name=_("Email Address"),
        help_text=_("The email address used to authenticate the user."),
    )
    code = models.CharField(
        verbose_name=_("Code"),
        help_text=_("The code used to authenticate the user."),
        max_length=6,
        default=random_auth_code_string
    )

    date_authenticated = models.DateTimeField(
        verbose_name=_("Date Authenticated"),
        help_text=_("The date the user was authenticated. None if not authenticated."),
        null=True,
        default=None
    )

    date_created = models.DateTimeField(verbose_name=_("Date Created"), auto_now_add=True)
    last_modified = models.DateTimeField(verbose_name=_("Last Modified"), auto_now=True)

    objects = OneTimePasswordManager()

    class Meta:
        verbose_name = _("One Time Password (OTP) Authentication")
        verbose_name_plural = _("One Time Password (OTP) Authentications")

    def __str__(self):
        return f"{self.code} - {self.email}"

    @property
    def is_authenticated(self):
        return self.date_authenticated is not None

    def authenticate(self):
        assert (not self.is_authenticated)
        self.date_authenticated = timezone.now()
        self.save()

    def is_expired(self):
        return self.date_created + timezone.timedelta(minutes=10) < timezone.now()

    def send_otp_email(self, **kwargs):
        from django.core.mail import send_mail

        send_mail(
            subject="Election Authentication Code",
            message=f"Please use the following code to login to the Election website: {self.code}",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[self.email],
            **kwargs)


class RestPasswordRequest(models.Model):
    email = models.EmailField(
        verbose_name=_("email"),
        help_text=_("The email who requested the password reset.")
    )

    auth_code = models.CharField(
        verbose_name=_("Code"),
        help_text=_("The code used to authenticate the user."),
        max_length=6,
        editable=False,
        default=random_auth_code_string
    )

    date_created = models.DateTimeField(verbose_name=_("Date Created"), auto_now_add=True)
    last_modified = models.DateTimeField(verbose_name=_("Last Modified"), auto_now=True)
    date_used = models.DateTimeField(verbose_name=_("Date Used"), null=True, default=None)

    objects = ResetPasswordManager()

    class Meta:
        verbose_name = _("Password Reset")
        verbose_name_plural = _("Password Resets")

    def __str__(self):
        return f"{self.email}"

    @property
    def user(self):
        return User.objects.get(email__iexact=self.email)

    def is_expired(self):
        return self.date_created + timezone.timedelta(minutes=10) < timezone.now()

    def is_used(self):
        return self.date_used is not None

    def set_used(self):
        self.date_used = timezone.now()
        self.save()

    def send_reset_password_email(self, **kwargs):
        from django.core.mail import send_mail

        send_mail(
            subject="Election Password Reset",
            message=f"Please use the following code to reset your password: {self.auth_code}",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[self.user.email],
            **kwargs)
