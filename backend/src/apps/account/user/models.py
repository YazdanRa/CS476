from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils.translation import gettext_lazy as _

from apps.account.user.managers import CustomUserManager


class User(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(verbose_name=_("First Name"), max_length=128, blank=True)
    last_name = models.CharField(verbose_name=_("Last Name"), max_length=128, blank=True)

    student_id = models.CharField(
        verbose_name=_("Student ID"),
        max_length=16,
        unique=True,
        null=True,
        default=None,
        error_messages=dict(
            unique=_("A user with this student ID already exists."),
        )
    )
    email = models.EmailField(
        verbose_name=_("Email Address"),
        unique=True,
        error_messages=dict(
            unique=_("A user with this email address already exists."),
        ),
    )
    phone_number = models.CharField(
        verbose_name=_("Phone Number"),
        max_length=16,
        unique=True,
        null=True,
        blank=True,
        error_messages={
            "unique": _("A user with this phone number already exists."),
        },
    )
    is_staff = models.BooleanField(
        verbose_name=_("Staff Status"),
        default=False,
        help_text=_("Designates whether the user can log into this admin site."),
    )
    is_active = models.BooleanField(
        verbose_name=_("Active"),
        default=True,
        help_text=_(
            "Designates whether this user should be treated as active. Unselect this instead of deleting user."
        ),
    )

    date_joined = models.DateTimeField(verbose_name=_("Date Joined"), auto_now_add=True)
    last_modified = models.DateTimeField(verbose_name=_("Last Modified"), auto_now=True)

    objects = CustomUserManager()

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")

    def __str__(self) -> str:
        return f"{self.display_name or self.full_name} <{self.email}>"

    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)

    @property
    def full_name(self) -> str:
        return f"{self.first_name} {self.last_name}".strip()

    def send_email(self, subject, message, from_email="URElection <consult@faustianloop.ca>", **kwargs):
        from django.core.mail import send_mail

        send_mail(subject, message, from_email, [self.email], **kwargs)
