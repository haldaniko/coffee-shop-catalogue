from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

from user.models import User


class Tag(models.Model):
    class TagType(models.TextChoices):
        ACTIVITY = 'activity', 'Activity'
        CONVENIENCE = 'convenience', 'Convenience'

    name = models.CharField(max_length=255, blank=False)
    type = models.CharField(
        max_length=20,
        choices=TagType.choices,
        blank=False
    )

    def __str__(self):
        return self.name


class Socials(models.Model):
    instagram = models.URLField(blank=True, null=True)
    facebook = models.URLField(blank=True, null=True)
    twitter = models.URLField(blank=True, null=True)


class Address(models.Model):
    postal_code = models.IntegerField(blank=False)
    street = models.CharField(max_length=72, blank=False,)
    city = models.CharField(max_length=36, blank=False,)

    def __str__(self):
        return f"{self.street}, {self.city}, {self.postal_code}"


class WorkTime(models.Model):
    mon_open = models.TimeField(blank=True, null=True)
    mon_close = models.TimeField(blank=True, null=True)
    tue_open = models.TimeField(blank=True, null=True)
    tue_close = models.TimeField(blank=True, null=True)
    wed_open = models.TimeField(blank=True, null=True)
    wed_close = models.TimeField(blank=True, null=True)
    thu_open = models.TimeField(blank=True, null=True)
    thu_close = models.TimeField(blank=True, null=True)
    fri_open = models.TimeField(blank=True, null=True)
    fri_close = models.TimeField(blank=True, null=True)
    sat_open = models.TimeField(blank=True, null=True)
    sat_close = models.TimeField(blank=True, null=True)
    sun_open = models.TimeField(blank=True, null=True)
    sun_close = models.TimeField(blank=True, null=True)


class CoffeeShop(models.Model):
    name = models.CharField(max_length=255, blank=False)
    phone = models.CharField(max_length=20, blank=True, null=True)
    image = models.ImageField(upload_to='coffee_shops/', blank=False)
    description = models.CharField(max_length=1024, blank=False)
    work_time = models.OneToOneField(WorkTime, on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag, related_name='coffee_shops')
    socials = models.OneToOneField(Socials, on_delete=models.CASCADE)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    address = models.OneToOneField(Address, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class GalleryImage(models.Model):
    image = models.ImageField(upload_to='gallery_images/', blank=False)
    coffee_shop = models.ForeignKey(CoffeeShop, related_name='gallery_images', on_delete=models.CASCADE)


class Comment(models.Model):
    text = models.CharField(max_length=512, blank=True, null=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    shop = models.ForeignKey(CoffeeShop, on_delete=models.CASCADE)

    def __str__(self):
        return f"Comment by {self.author} for {self.shop}"


class Review(models.Model):
    text = models.CharField(max_length=512, blank=True, null=True)
    stars = models.IntegerField(
        validators=[
            MinValueValidator(1),
            MaxValueValidator(5)
        ],
        blank=False
    )
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    shop = models.ForeignKey(CoffeeShop, on_delete=models.CASCADE)

    def __str__(self):
        return f"Review by {self.author} for {self.shop}"
