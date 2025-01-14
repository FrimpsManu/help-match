"""Form for signup."""
from django import forms
from allauth.account.forms import SignupForm as AllauthSignupForm


class NamedSignupForm(AllauthSignupForm):
    """Subclass of SignupForm that adds first_name and last_name fields."""
    first_name = forms.CharField(max_length=30, required=True, label="First Name")
    last_name = forms.CharField(max_length=30, required=True, label="Last Name")

    def save(self, request):
        user = super().save(request)
        user.first_name = self.cleaned_data["first_name"]
        user.last_name = self.cleaned_data["last_name"]
        user.save()
        return user
