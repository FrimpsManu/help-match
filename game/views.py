"""The game view module"""
from django.views import View
from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin

class Game(LoginRequiredMixin, View):
    """The game view"""

    person_fields = ("role", "channel", "specific")
    user_fields = ("first_name", "last_name", "username")

    def get(self, request):
        """Render the game page"""
        user = request.user
        if not hasattr(user, "person"):
            messages.error(request, "Please fill in all fields")
            return redirect("/")
        person = user.person
        game_data = {field: getattr(person, field) for field in self.person_fields}
        game_data.update({field: getattr(user, field) for field in self.user_fields})
        if not all(game_data.values()):
            print(game_data)
            messages.error(request, "Please fill in all fields")
            return redirect("/")
        game_details = {
            "game_data": game_data
        }
        return render(request, "game.html", game_details)
