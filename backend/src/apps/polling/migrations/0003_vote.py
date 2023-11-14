# Generated by Django 4.1.7 on 2023-10-22 15:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("polling", "0002_voteoption"),
    ]

    operations = [
        migrations.CreateModel(
            name="Vote",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("date_voted", models.DateTimeField(auto_now_add=True, verbose_name="Voted at")),
                ("last_modified", models.DateTimeField(auto_now=True, verbose_name="Last modified")),
                ("election", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="votes", to="polling.election", verbose_name="Election")),
                ("selected_option", models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name="votes", to="polling.voteoption", verbose_name="Vote for")),
                ("voter", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="votes", to=settings.AUTH_USER_MODEL, verbose_name="Voter")),
            ],
            options={
                "verbose_name": "Vote",
                "verbose_name_plural": "Votes",
            },
        ),
    ]
