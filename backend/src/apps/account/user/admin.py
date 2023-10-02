from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Permission
from django.utils.translation import gettext as _

from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    permissions = (
        _("permissions"),
        {
            "fields": (
                (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                ),
                "groups",
                "user_permissions",
            )
        },
    )

    list_display = ("id", "student_id", "first_name", "last_name", "email")
    list_display_links = ("student_id",)
    list_filter = ("date_joined", "is_staff", "is_active", "is_superuser")
    fieldsets = (
        (
            _("personal information"),
            {
                "fields": (
                    ("id", "student_id"),
                    ("first_name", "last_name"),
                    ("email", "phone_number"),
                )
            },
        ),
        permissions,
        (
            _("Last updates"),
            {
                "fields": (
                    ("date_joined", "last_login"),
                    "password"
                )
            },
        ),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "student_id",
                    "email",
                    ("first_name", "last_name"),
                    ("password1", "password2"),
                ),
            },
        ),
    )
    readonly_fields = ("id", "date_joined", "last_login", "password")
    search_fields = ("id", "first_name", "last_name", "phone_number", "email", "student_id")
    ordering = ["-date_joined"]
    save_as_continue = False
    actions = [
        "set_as_inactive",
        "set_as_superuser",
        "set_as_staff",
    ]

    # set as superuser
    def set_as_superuser(self, request, queryset):
        count = queryset.update(is_superuser=True)
        self.message_user(request, _("{} user(s) set as superuser").format(count))

    set_as_superuser.short_description = _("mark selected user(s) as superuser")

    # set as staff
    def set_as_staff(self, request, queryset):
        count = queryset.update(is_staff=True)
        self.message_user(request, _("{} user(s) set as staff").format(count))

    set_as_staff.short_description = _("mark selected user(s) as staff")

    # set as inactive
    def set_as_inactive(self, request, queryset):
        count = queryset.update(is_active=False)
        self.message_user(request, _("{} user(s) set as inactive").format(count))

    set_as_inactive.short_description = _("mark selected user(s) as inactive")


admin.site.register(Permission)
