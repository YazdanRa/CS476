from django.urls import path, include

from . import views

urlpatterns = [
    path("", views.ElectionsListView.as_view(), name="elections-list"),
    path("create", views.CreateElectionView.as_view(), name="create-election"),
    path(
        "<int:pk>/",
        include(
            [
                path("", views.ElectionDetailView.as_view(), name="election-detail"),
                path("recordVote", views.RecordVoteView.as_view(), name="record-vote"),
                path("hasUserVoted", views.HasUserVotedView.as_view(), name="has-user-voted"),
            ]
        )
    )
]
