# Generated by Django 4.1.7 on 2023-11-07 00:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("user", "0004_user_profile_picture"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="date_of_birth",
            field=models.DateField(blank=True, null=True, verbose_name="Date of Birth"),
        ),
    ]
