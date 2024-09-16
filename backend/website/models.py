import os
import uuid

from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.utils.text import slugify


def image_file_path(instance, filename):
    _, extension = os.path.splitext(filename)
    filename = f"{slugify(instance.name)}-{uuid.uuid4()}{extension}"

    return os.path.join(f"uploads/images/", filename)


def gallerry_image_file_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = f'{uuid.uuid4()}.{ext}'
    coffee_shop_name = instance.coffee_shop.name
    return os.path.join('uploads', 'gallery', coffee_shop_name, filename)


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


class City(models.Model):
    city_name = models.CharField(max_length=32)
    map_svg = models.TextField()


class CoffeeShop(models.Model):
    name = models.CharField(max_length=255, blank=False)
    phone = models.CharField(max_length=20, blank=True, null=True)
    image = models.ImageField(upload_to=image_file_path, blank=True)
    description = models.CharField(max_length=1024, blank=False)
    price_rate = models.IntegerField(validators=[
            MinValueValidator(1),
            MaxValueValidator(3)
        ],)
    is_network = models.BooleanField()
    work_time = models.OneToOneField(WorkTime, on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag, related_name='coffee_shops')
    socials = models.OneToOneField(Socials, on_delete=models.CASCADE)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    address = models.OneToOneField(Address, on_delete=models.CASCADE)
    city = models.ForeignKey(City, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class GalleryImage(models.Model):
    image = models.ImageField(upload_to=gallerry_image_file_path, blank=False)
    coffee_shop = models.ForeignKey(CoffeeShop, related_name='gallery_images', on_delete=models.CASCADE)


class Comment(models.Model):
    text = models.CharField(max_length=512, blank=True, null=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
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
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    shop = models.ForeignKey(CoffeeShop, on_delete=models.CASCADE)

    def __str__(self):
        return f"Review by {self.author} for {self.shop}"
