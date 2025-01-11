"""The consumers for the websocket connections."""

import json
from channels.generic.websocket import AsyncWebsocketConsumer
# from asgi_django.signals import disconnect_websocket

class GameConsumer(AsyncWebsocketConsumer):
    """Consumer for the game websocket."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.group_name = None

    async def connect(self, path="channel"):
        self.group_name = self.scope["url_route"]["kwargs"][path]
        # Don't work if user is not authenticated
        if not self.scope["user"].is_authenticated:
            await self.close()
            return

        await self.channel_layer.group_add(
            self.group_name, self.channel_name
        )
        await self.accept()
        print("Connected")

    async def disconnect(self, code):
        super().disconnect(code)
        username = self.scope["user"].username
        # Make the kind of object frontend sends and send to default
        data = {
            "handler": "person_leave",
            "data": {"username": username}
        }
        await self.default({"data": data})

    async def receive(self, text_data=None, bytes_data=None):
        """Receive message from WebSocket."""
        await self.default({"data": json.loads(text_data)})

    async def default(self, event):
        """Default handler for events."""
        data = event["data"]
        await self.channel_layer.group_send(
            self.group_name, {"type": data["handler"], "data": json.dumps(data)}
        )

    async def former_enter(self, event):
        """Ask send former person details to who just entered.
        Will send to all for now.
        Frontend will filter"""
        await self.send(text_data=event["data"])

    async def person_move(self, event):
        """Handler for move event."""
        await self.send(text_data=event["data"])

    async def person_enter(self, event):
        """Handler for person entered"""
        await self.send(text_data=event["data"])

    async def person_leave(self, event):
        """Handler for person left."""
        await self.send(text_data=event["data"])

# Make a chat consumer
class ChatConsumer(GameConsumer):
    """Consumer for the chat websocket."""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.group_name = None

    async def connect(self, path="pod"):
        """Connect to the websocket."""
        await super().connect(path)

    async def chat_message(self, event):
        """Handler for chat message event."""
        await self.send(text_data=event["data"])
