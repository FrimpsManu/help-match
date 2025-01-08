from django.views import View
from django.shortcuts import render
from django.contrib.auth.mixins import LoginRequiredMixin

class Game(View, LoginRequiredMixin):
    """The game view"""
    def get(self, request):
        """Render the game page"""
        # person = request.user.person
        # game_details = {
        #     ""
        # }
        return render(request, "game.html")