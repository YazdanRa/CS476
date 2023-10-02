from django.db.models import Manager


class OneTimePasswordManager(Manager):
    def create(self, **kwargs):
        obj = super().create(**kwargs)
        obj.send_otp_email()
