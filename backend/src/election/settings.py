"""
Django settings for election project.

Generated by 'django-admin startproject' using Django 4.1.7.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""

from datetime import timedelta
from os import path, getenv
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = getenv("SECRET_KEY", "insecure-django-secret-key")

# SECURITY WARNING: don"t run with debug turned on in production!
DEBUG = getenv("DEBUG", False)

ALLOWED_HOSTS = getenv("ALLOWED_HOST", "*").split(",")

AUTH_USER_MODEL = "user.User"

# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # 1st party apps
    "apps.account.user",
    "apps.account.authentication",
    "apps.polling",

    # 3rd party apps
    "corsheaders",
    "django_filters",
    "rest_framework",
    "rest_framework.authtoken",
    "django_prometheus",
]

MIDDLEWARE = [
    "django_prometheus.middleware.PrometheusBeforeMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    # "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "django_prometheus.middleware.PrometheusAfterMiddleware"
]

ROOT_URLCONF = 'election.urls'

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [path.join(BASE_DIR, "templates")],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = 'election.wsgi.application'

# Cache
CACHES = {
    "default": {
        "BACKEND": "django_prometheus.cache.backends.filebased.FileBasedCache",
        "LOCATION": "/var/tmp/django_cache",
    }
}

# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django_prometheus.db.backends.postgresql",
        "HOST": getenv("DB_HOST", "db"),
        "PORT": getenv("GCP_CLOUDSQL_DATABASE_PORT", "5432"),
        "NAME": getenv("DB_NAME", "election"),
        "USER": getenv("DB_USER", "postgres"),
        "PASSWORD": getenv("DB_PASS", "postgres"),
    }
}

# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = "en-ca"

TIME_ZONE = "America/Regina"

USE_I18N = True

# USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = "/static/"
STATIC_ROOT = path.join(BASE_DIR, "static")
STATICFILES_DIRS = [path.join(BASE_DIR, "election/static")]

MEDIA_URL = "/media/"
MEDIA_ROOT = path.join(BASE_DIR, "media")
PUBLIC_MEDIA_LOCATION = "media"

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Logging
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "standard": {"format": "[%(levelname)s] %(name)s: %(message)s"},
    },
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "standard",
        },
    },
    "loggers": {
        "django": {
            "handlers": ["console"],
            "level": "INFO",
            "propagate": True,
        },
    },
}

# Django Rest Framework
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.TokenAuthentication",
        "rest_framework.authentication.SessionAuthentication",
    ],
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",
        "rest_framework.filters.OrderingFilter",
    ]
}

CORS_ALLOW_ALL_ORIGINS = True

CSRF_TRUSTED_ORIGINS = ["https://api.cs476.yazdanra.com", "https://127.0.0.1", "https://localhost"]

# Email
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = getenv("EMAIL_HOST", "smtp.mail.me.com")
EMAIL_USE_TLS = True  # Set to False if your email server doesn't use TLS
EMAIL_PORT = 587 if EMAIL_USE_TLS else 465
EMAIL_HOST_USER = getenv("EMAIL_HOST_USER", "noreply@yazdanra.com")
EMAIL_HOST_PASSWORD = getenv("EMAIL_HOST_PASSWORD", "insecure-password")
DEFAULT_FROM_EMAIL = getenv("DEFAULT_FROM_EMAIL", "Yazdan CS476 Project <hi@yazdanra.com>")
AUTH_EMAIL_LIMIT_DAY = timedelta(days=1)
AUTH_EMAIL_LIMIT_COUNT = 10
