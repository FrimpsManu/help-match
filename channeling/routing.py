"""Routing for the websocket connections."""
from django.urls import path

from . import consumers


websocket_urlpatterns = [
    path("ws/game/<str:channel>/", consumers.GameConsumer.as_asgi()),
    path("ws/chat/<str:pod>", consumers.ChatConsumer.as_asgi()),
]
