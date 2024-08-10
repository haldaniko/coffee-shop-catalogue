from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models


class User(AbstractUser):
    photo = models.ImageField(upload_to='profile_photos/', null=True, blank=True)
    is_owner = models.BooleanField(default=False)
    favorite_shops = models.ManyToManyField('website.CoffeeShop', related_name='favorited_by', blank=True)

    groups = models.ManyToManyField(
        Group,
        related_name='custom_user_set',
        blank=True,
        help_text='The groups this user belongs to.'
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_user_permissions_set',
        blank=True,
        help_text='Specific permissions for this user.'
    )

    def __str__(self):
        return self.username
