"""Help app view"""
import json

from django.views.generic.edit import CreateView
# from django.shortcuts import render

from .models import Help

# Get help.json loaded as a constant
with open("help.json", 'r', encoding="utf-8") as help_file:
    HELP_DATA = json.load(help_file)
class HelpView(CreateView):
    """The Help View"""
    template_name = "help.html"
    model = Help
    fields = ["channel", "role", "specific"]
    success_url = "/help/"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["HELP_DATA"] = HELP_DATA
        return context
