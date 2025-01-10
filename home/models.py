"""The Person (to (be) help(ed)) Model"""
from django.db import models
from django.core.exceptions import ValidationError

HELP_ROLES = ("helper", "helped")

# Validate, role can only be "helper" or "helped"
def validate_role(value):
    """Validate role"""
    if value not in HELP_ROLES:
        raise ValidationError("Role must be either 'helper' or 'helped'")

class Person(models.Model):
    """The Help Model"""
    user = models.OneToOneField("auth.User", on_delete=models.CASCADE)
    channel = models.CharField(max_length=100)
    role = models.EmailField(validators=[validate_role])
    specific = models.TextField()
