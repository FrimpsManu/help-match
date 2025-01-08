from django.views import View
from django.shortcuts import render
from django.contrib.auth.mixins import LoginRequiredMixin

class Game(View, LoginRequiredMixin):
    """The game view"""

    person_fields = ("role", "channel", "specific")
    user_fields = ("first_name", "last_name", "username")

    def get(self, request):
        """Render the game page"""
        # Do a simulated request.user
        request.user = {
            "first_name": "John",
            "last_name": "Doe",
            "username": "johndoe",
            "person": {
                "role": "helper",
                "channel": "academic-math",
                "specific": "Calculus"
            }
        }
        user, person = request.user, request.user["person"]
        game_data = {field: person[field] for field in self.person_fields}
        game_data.update({field: user[field] for field in self.user_fields})
        game_details = {
            "game_data": game_data
        }
        return render(request, "game.html", game_details)
