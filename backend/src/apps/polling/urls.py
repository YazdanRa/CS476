from django.urls import path, include

from . import views

urlpatterns = [
    path("my", views.MyElectionsListView.as_view(), name="my-elections-list"),
    path("create", views.CreateElectionView.as_view(), name="create-election"),
    path("votingHistory", views.VotingHistoryView.as_view(), name="my-voting-history"),
    path(
        "byID/<str:pk>/",
        include(
            [
                path("", views.ElectionDetailView.as_view(), name="election-detail-id"),
                path("recordVote", views.RecordVoteView.as_view(), name="record-vote"),
            ]
        )
    ),
    path("byAccessCode/<str:access_code>/", views.ElectionDetailView.as_view(), name="election-detail-access-code"),
]
