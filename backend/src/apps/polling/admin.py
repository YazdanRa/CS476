from django.contrib import admin

from .models import Election, VoteOption, Vote

class VoteOptionInline(admin.TabularInline):
    model = VoteOption
    extra = 0

@admin.register(Election)
class ElectionAdmin(admin.ModelAdmin):
    list_display = ["id", "title", "from_date", "to_date", "status"]
    list_display_links = ["id", "title"]
    list_filter = ["from_date", "to_date", "can_choose_multiple_options", "show_results_after_election"]
    search_fields = ["id", "title", "access_code"]
    readonly_fields = ["id", "date_created", "last_modified", "status", "duration", "access_code", "winners"]
    inlines = [VoteOptionInline]


@admin.register(VoteOption)
class VoteOptionAdmin(admin.ModelAdmin):
    list_display = ["id", "title", "election", "votes_count", "vote_percentage"]
    list_display_links = ["id", "title"]
    list_filter = ["election", "date_created", "last_modified"]
    search_fields = ["id", "title", "description", "election__title"]
    readonly_fields = ["id", "votes_count", "vote_percentage", "date_created", "last_modified"]


@admin.register(Vote)
class VoteAdmin(admin.ModelAdmin):
    list_display = ["id", "voter", "election", "selected_option", "date_voted"]
    list_display_links = ["id"]
    list_filter = ["election", "date_voted", "last_modified"]
    search_fields = [
        "id",

        "voter__full_name",
        "voter__email",

        "election__title",

        "selected_option__title",
    ]
    readonly_fields = ["id", "date_voted", "last_modified"]
