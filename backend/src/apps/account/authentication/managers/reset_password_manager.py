from django.db.models import Manager


class ResetPasswordManager(Manager):
    def create(self, **kwargs):
        obj = super().create(**kwargs)
        obj.send_reset_password_email()
