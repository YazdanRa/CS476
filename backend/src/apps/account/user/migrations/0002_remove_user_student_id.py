# Generated by Django 4.1.7 on 2023-10-02 01:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("user", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="user",
            name="student_id",
        ),
    ]
