from django.urls import path

from . import views

urlpatterns = [
    path("info", views.UserInfoView.as_view(), name="user-info"),
    path("update", views.UpdateUserView.as_view(), name="update-user"),
    path("groups", views.GetGroupsView.as_view(), name="get-groups"),
    path("uploadProfilePicture", views.ProfilePictureUploadView.as_view(), name="profile-picture-upload"),
]
