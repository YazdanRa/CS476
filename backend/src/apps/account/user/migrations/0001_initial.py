# Generated by Django 4.1.7 on 2023-10-02 01:35

import apps.account.user.managers
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("auth", "0012_alter_user_first_name_max_length"),
    ]

    operations = [
        migrations.CreateModel(
            name="User",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("password", models.CharField(max_length=128, verbose_name="password")),
                ("last_login", models.DateTimeField(blank=True, null=True, verbose_name="last login")),
                ("is_superuser", models.BooleanField(default=False, help_text="Designates that this user has all permissions without explicitly assigning them.", verbose_name="superuser status")),
                ("first_name", models.CharField(blank=True, max_length=128, verbose_name="First Name")),
                ("last_name", models.CharField(blank=True, max_length=128, verbose_name="Last Name")),
                ("student_id", models.CharField(default=None, error_messages={"unique": "A user with this student ID already exists."}, max_length=16, null=True, unique=True, verbose_name="Student ID")),
                ("email", models.EmailField(error_messages={"unique": "A user with this email address already exists."}, max_length=254, unique=True, verbose_name="Email Address")),
                ("phone_number", models.CharField(blank=True, error_messages={"unique": "A user with this phone number already exists."}, max_length=16, null=True, unique=True, verbose_name="Phone Number")),
                ("is_staff", models.BooleanField(default=False, help_text="Designates whether the user can log into this admin site.", verbose_name="Staff Status")),
                ("is_active", models.BooleanField(default=True, help_text="Designates whether this user should be treated as active. Unselect this instead of deleting user.", verbose_name="Active")),
                ("date_joined", models.DateTimeField(auto_now_add=True, verbose_name="Date Joined")),
                ("last_modified", models.DateTimeField(auto_now=True, verbose_name="Last Modified")),
                ("groups", models.ManyToManyField(blank=True, help_text="The groups this user belongs to. A user will get all permissions granted to each of their groups.", related_name="user_set", related_query_name="user", to="auth.group", verbose_name="groups")),
                ("user_permissions", models.ManyToManyField(blank=True, help_text="Specific permissions for this user.", related_name="user_set", related_query_name="user", to="auth.permission", verbose_name="user permissions")),
            ],
            options={
                "verbose_name": "User",
                "verbose_name_plural": "Users",
            },
            managers=[
                ("objects", apps.account.user.managers.CustomUserManager()),
            ],
        ),
    ]
