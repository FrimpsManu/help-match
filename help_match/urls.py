"""
URL configuration for help_match project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import include, path

from ai_select.views import AISelect
from chat.views import Chat
from home.views import Home
from game.views import Game


urlpatterns = [
    path("admin/", admin.site.urls),
    path("ai-select/", AISelect.as_view(), name="ai-select"),
    path("chat/", Chat.as_view(), name="chat"),
    path("", Home.as_view(), name="help"),
    path("game/", Game.as_view(), name="game"),
    path("accounts/", include("allauth.urls")),
]
