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

    list_display = ("id", "full_name", "email")
    list_display_links = ("id", "email")
    list_filter = ("date_joined", "is_staff", "is_active", "is_superuser")
    fieldsets = (
        (
            _("personal information"),
            {
                "fields": (
                    ("profile_picture_tag", "profile_picture"),
                    "id",
                    "full_name",
                    "email",
                    "date_of_birth",
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
                    "profile_picture",
                    "full_name",
                    "email",
                    ("password1", "password2"),
                    "date_of_birth",
                ),
            },
        ),
    )
    readonly_fields = ("id", "profile_picture_tag", "date_joined", "last_login", "password")
    search_fields = ("id", "full_name", "email")
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

    def profile_picture_tag(self, obj: User):
        from django.utils.html import format_html
        return format_html(f'<img src="{obj.profile_picture.url}" width="150" height="150"/>')

    profile_picture_tag.short_description = "Profile Picture"


admin.site.register(Permission)
