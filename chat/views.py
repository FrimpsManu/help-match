from django.shortcuts import render

from django.views import View


class Chat(View):
    """The chat view for displaying the chat UI"""
    def get(self, request):
        return render(request, "chat.html", {})
    