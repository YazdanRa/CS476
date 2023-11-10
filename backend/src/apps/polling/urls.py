from django.urls import path, include

from . import views

urlpatterns = [
    path("my", views.MyElectionsListView.as_view(), name="my-elections-list"),
    path("create", views.CreateElectionView.as_view(), name="create-election"),
    path(
        "byAccessCode/<str:access_code>/",
        include(
            [
                path("", views.ElectionDetailView.as_view(), name="election-detail"),
                path("recordVote", views.RecordVoteView.as_view(), name="record-vote"),
            ]
        )
    ),
    path(
        "byID/<str:pk>/",
        include(
            [
                path("", views.ElectionDetailView.as_view(), name="election-detail"),
                path("recordVote", views.RecordVoteView.as_view(), name="record-vote"),
            ]
        )
    ),
    path("voteHistory", views.VoteHistoryView.as_view(), name="vote-history"),
]
