"""Help app view"""
import json

from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render, redirect
from django.views import View

from .models import Person

# Get help.json loaded as a constant
with open("help.json", 'r', encoding="utf-8") as help_file:
    HELP_DATA = json.load(help_file)

class Home(View, LoginRequiredMixin):
    """The Help View"""
    def post(self, request):
        """Handle the form submission"""
        # person = request.user.person
        help_data = request.POST
        for key, value in help_data.items():
            print(key, value)
            # setattr(person, key, value)
        # person.save()
        # Redirect to the help page
        print(Person)
        return redirect("/")

    def get(self, request):
        """Render the help page"""
        context = {"HELP_DATA": HELP_DATA}
        return render(request, "help.html", context)
