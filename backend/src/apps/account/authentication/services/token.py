from rest_framework.authtoken.models import Token

from apps.account.user.models import User


def get_authorization_token(user: User) -> str:
    return f"Token {Token.objects.get_or_create(user=user)[0]}"


def remove_authorization_token(user: User) -> None:
    Token.objects.filter(user=user).delete()


def regenerate_authorization_token(user: User) -> str:
    remove_authorization_token(user=user)
    return get_authorization_token(user=user)
