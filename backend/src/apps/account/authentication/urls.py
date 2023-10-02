from django.urls import path, include

from . import views

urlpatterns = [

    path("otp/", include([
        path("request", views.RequestOneTimePasswordView.as_view(), name="otp-request"),
        path("verify", views.ValidateOneTimePasswordView.as_view(), name="otp-validate"),
    ])),

    path("token/", include([
        path("register", views.RegisterView.as_view(), name="register"),
        path("login", views.LoginView.as_view(), name="login"),
        path("logout", views.LogoutView.as_view(), name="logout"),
    ]))

]
