"""Routing for the websocket connections."""
from django.urls import path

from . import consumers


websocket_urlpatterns = [
    path("ws/game/", consumers.GameConsumer.as_asgi()),
    path("ws/chat/", consumers.ChatConsumer.as_asgi()),
]
