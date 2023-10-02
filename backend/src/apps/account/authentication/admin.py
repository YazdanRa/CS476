from django.contrib import admin

from apps.account.authentication.models import OneTimePassword


@admin.register(OneTimePassword)
class EmailAuthAdmin(admin.ModelAdmin):
    list_display = ["id", "email", "date_created", "date_authenticated"]
    list_display_links = ["id", "email"]
    list_filter = ["date_authenticated", "date_created", "last_modified"]
    search_fields = ["id", "email"]