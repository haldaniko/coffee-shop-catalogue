from django.contrib import admin
from .models import (
    Tag,
    Address,
    CoffeeShop,
    Comment,
    GalleryImage,
    Review,
    Socials,
    WorkTime, City
)


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name', 'type')
    search_fields = ('name', 'type')


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ('postal_code', 'street', 'city')
    search_fields = ('postal_code', 'street', 'city')


@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = ('city_name',)
    search_fields = ('city_name',)


@admin.register(CoffeeShop)
class CoffeeShopAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'address', 'description')
    search_fields = ('name', 'phone', 'address')
    list_filter = ('tags', 'owner')


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('author', 'shop', 'text')
    search_fields = ('author__username', 'shop__name', 'text')
    list_filter = ('author', 'shop')


@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ('coffee_shop', 'image')
    search_fields = ('coffee_shop__name',)


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('author', 'shop', 'stars', 'text')
    search_fields = ('author__username', 'shop__name', 'text')
    list_filter = ('stars', 'shop')


@admin.register(Socials)
class SocialsAdmin(admin.ModelAdmin):
    list_display = ('instagram', 'facebook', 'twitter')
    search_fields = ('instagram', 'facebook', 'twitter')


@admin.register(WorkTime)
class WorkTimeAdmin(admin.ModelAdmin):
    list_display = (
        'mon_open', 'mon_close', 'tue_open', 'tue_close',
        'wed_open', 'wed_close', 'thu_open', 'thu_close',
        'fri_open', 'fri_close', 'sat_open', 'sat_close',
        'sun_open', 'sun_close'
    )
