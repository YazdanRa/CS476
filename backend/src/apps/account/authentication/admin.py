from django.contrib import admin

from apps.account.authentication.models import OneTimePassword, RestPasswordRequest


@admin.register(OneTimePassword)
class EmailAuthAdmin(admin.ModelAdmin):
    list_display = ["id", "email", "date_created", "date_authenticated"]
    list_display_links = ["id", "email"]
    list_filter = ["date_authenticated", "date_created", "last_modified"]
    search_fields = ["id", "email"]


@admin.register(RestPasswordRequest)
class RestPasswordRequestAdmin(admin.ModelAdmin):
    list_display = ["id", "email", "auth_code", "date_created", "date_used"]
    list_display_links = ["id", "email"]
    list_filter = ["date_used", "date_created", "last_modified"]
    search_fields = ["id", "email"]