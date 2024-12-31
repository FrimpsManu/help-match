"""Help app view"""
from django.views.generic.edit import CreateView
from django.shortcuts import render

from .models import Help


class HelpView(CreateView):
    template_name = 'help/help.html'
    model = Help
    fields = ['name', 'email', 'message']
    success_url = '/help/'
