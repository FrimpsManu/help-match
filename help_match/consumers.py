"""The consumers for the websocket connections."""

from channels.generic.websocket import AsyncWebsocketConsumer
# from asgi_django.signals import disconnect_websocket

class GameConsumer(AsyncWebsocketConsumer):
    """Consumer for the game websocket."""
    group_name = "game"

    async def connect(self):
        print(self.group_name)
        await self.channel_layer.group_add(
            self.group_name, self.channel_name
        )
        await self.accept()
        print("Connected")

    async def receive(self, text_data=None, bytes_data=None):
        """Receive message from WebSocket."""
        print("Received data from frontend", text_data)
        await self.channel_layer.group_send(
            self.group_name, {"type": "gamer_located", "data": text_data}
        )

    async def default(self, event):
        """Default handler for events."""


    async def gamer_located(self, event):
        """Handler for walker helpd event."""
        await self.send(text_data=event["data"])

# Make a chat consumer
class ChatConsumer(AsyncWebsocketConsumer):
    """Consumer for the chat websocket."""
    group_name = "chat"

    async def connect(self):
        print(self.group_name)
        await self.channel_layer.group_add(
            self.group_name, self.channel_name
        )
        await self.accept()
        print("Connected")

    async def receive(self, text_data=None, bytes_data=None):
        """Receive message from WebSocket."""
        print("Received data from frontend", text_data)
        await self.channel_layer.group_send(
            self.group_name, {"type": "chat_message", "data": text_data}
        )

    async def default(self, event):
        """Default handler for events."""


    async def chat_message(self, event):
        """Handler for chat message event."""
        await self.send(text_data=event["data"])
