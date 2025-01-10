"""The Person (to (be) help(ed)) Model"""
from django.db import models
from django.contrib.auth.models import User


class Person(models.Model):
    """The Person Model"""
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    user = models.OneToOneField("auth.User", on_delete=models.CASCADE)
    channel = models.CharField(max_length=100)
    role = models.EmailField()
    specific = models.TextField()

    def __str__(self):
        return f"{self.user} ({self.channel})"
