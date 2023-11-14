# Generated by Django 4.1.7 on 2023-04-27 01:45

import apps.account.authentication.models
from django.db import migrations, models


class Migration(migrations.Migration):

    replaces = [("authentication", "0001_initial"), ("authentication", "0002_alter_emailauth_options"), ("authentication", "0003_alter_emailauth_code"), ("authentication", "0004_rename_emailauth_onetimepassword"), ("authentication", "0005_alter_onetimepassword_options")]

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name="OneTimePassword",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("email", models.EmailField(help_text="The email address used to authenticate the user.", max_length=254, verbose_name="Email Address")),
                ("code", models.CharField(default=apps.account.authentication.models.random_auth_code_string, help_text="The code used to authenticate the user.", max_length=6, verbose_name="Code")),
                ("date_authenticated", models.DateTimeField(default=None, help_text="The date the user was authenticated. None if not authenticated.", null=True, verbose_name="Date Authenticated")),
                ("date_created", models.DateTimeField(auto_now_add=True, verbose_name="Date Created")),
                ("last_modified", models.DateTimeField(auto_now=True, verbose_name="Last Modified")),
            ],
            options={
                "verbose_name": "One Time Password (OTP) Authentication",
                "verbose_name_plural": "One Time Password (OTP) Authentications",
            },
        ),
    ]
