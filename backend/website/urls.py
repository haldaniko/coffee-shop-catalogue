from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    TagViewSet,
    SocialsViewSet,
    AddressViewSet,
    WorkTimeViewSet,
    CoffeeShopViewSet,
    GalleryImageViewSet,
    CommentViewSet,
    ReviewViewSet
)

router = DefaultRouter()
router.register(r'tags', TagViewSet)
router.register(r'socials', SocialsViewSet)
router.register(r'addresses', AddressViewSet)
router.register(r'worktimes', WorkTimeViewSet)
router.register(r'coffeeshops', CoffeeShopViewSet)
router.register(r'galleryimages', GalleryImageViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'reviews', ReviewViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

app_name = "website"
