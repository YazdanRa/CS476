# Generated by Django 4.1.7 on 2023-10-22 15:29

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("auth", "0012_alter_user_first_name_max_length"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Election",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=256, verbose_name="Title")),
                ("description", models.TextField(blank=True, max_length=2048, null=True, verbose_name="Description")),
                ("can_choose_multiple_options", models.BooleanField(default=False, verbose_name="Can choose multiple options")),
                ("from_date", models.DateTimeField(verbose_name="Start at")),
                ("to_date", models.DateTimeField(verbose_name="End at")),
                ("date_created", models.DateTimeField(auto_now_add=True, verbose_name="Created at")),
                ("last_modified", models.DateTimeField(auto_now=True, verbose_name="Last modified")),
                ("associated_groups", models.ManyToManyField(blank=True, help_text="Groups that can vote in this election", related_name="elections", to="auth.group", verbose_name="Associated groups")),
                ("creator", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="elections", to=settings.AUTH_USER_MODEL, verbose_name="Creator")),
            ],
            options={
                "verbose_name": "Election",
                "verbose_name_plural": "Elections",
                "ordering": ["-from_date"],
            },
        ),
    ]
