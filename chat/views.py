from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render, redirect
from django.views import View


class Chat(LoginRequiredMixin, View):
    """The chat view for displaying the chat UI"""
    def get(self, request):
        """Render the chat.html template"""
        try:
            person = request.user.person
            game_channel = person.channel
        except AttributeError:
            # No person or channel, exit to /
            return redirect("/")

        chat_details = {"game_channel": game_channel}
        return render(request, "chat.html", chat_details)
