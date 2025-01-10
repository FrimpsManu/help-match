"""Help app view"""
import json

from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render, redirect
from django.views import View

from .models import Person

# Get help.json loaded as a constant
with open("help.json", 'r', encoding="utf-8") as help_file:
    HELP_DATA = json.load(help_file)

class Home(LoginRequiredMixin, View):
    """The Help View"""
    def post(self, request):
        """Handle the form submission"""
        user = request.user
        person = hasattr(user, "person") and user.person or Person(user=user)
        for key, value in request.POST.items():
            setattr(person, key, value)
        for obj in (person, user):
            obj.save()

        return redirect("/game/")

    def get(self, request):
        """Render the help page"""
        context = {"HELP_DATA": HELP_DATA}
        return render(request, "help.html", context)
