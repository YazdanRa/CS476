from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils.translation import gettext_lazy as _

from apps.account.user.managers import CustomUserManager


def upload_profile_place_pics(instance, filename):
    ext = filename.split(".")[-1].lower()
    return "profile_images/{user}.{ext}".format(user=instance.pk, ext=ext)


class User(AbstractBaseUser, PermissionsMixin):
    full_name = models.CharField(verbose_name=_("Full Name"), max_length=256, blank=True)

    email = models.EmailField(
        verbose_name=_("Email Address"),
        unique=True,
        error_messages=dict(
            unique=_("A user with this email address already exists."),
        ),
    )

    profile_picture = models.ImageField(
        verbose_name=_("Profile Picture"),
        upload_to=upload_profile_place_pics,
        null=True,
        blank=True,
    )

    date_of_birth = models.DateField(verbose_name=_("Date of Birth"), null=True, blank=True)

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
        return f"{self.full_name} <{self.email}>"

    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)

    def send_email(self, subject, message, from_email="URElection <noreply@yazdanra.com>", **kwargs):
        from django.core.mail import send_mail

        send_mail(subject, message, from_email, [self.email], **kwargs)
