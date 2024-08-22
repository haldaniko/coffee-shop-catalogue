from rest_framework import viewsets
from .models import (
    Tag,
    Socials,
    Address,
    WorkTime,
    CoffeeShop,
    GalleryImage,
    Comment,
    Review
)
from .serializers import (
    TagSerializer,
    SocialsSerializer,
    AddressSerializer,
    WorkTimeSerializer,
    CoffeeShopSerializer,
    GalleryImageSerializer,
    CommentSerializer,
    ReviewSerializer, CoffeeShopDetailSerializer, CommentDetailSerializer, ReviewDetailSerializer
)


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class SocialsViewSet(viewsets.ModelViewSet):
    queryset = Socials.objects.all()
    serializer_class = SocialsSerializer


class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer


class WorkTimeViewSet(viewsets.ModelViewSet):
    queryset = WorkTime.objects.all()
    serializer_class = WorkTimeSerializer


class CoffeeShopViewSet(viewsets.ModelViewSet):
    queryset = CoffeeShop.objects.all()

    def get_serializer_class(self):
        if self.action == "list":
            return CoffeeShopSerializer

        if self.action == "retrieve":
            return CoffeeShopDetailSerializer

        return CoffeeShopSerializer


class GalleryImageViewSet(viewsets.ModelViewSet):
    queryset = GalleryImage.objects.all()
    serializer_class = GalleryImageSerializer


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()

    def get_serializer_class(self):
        if self.action in ("list", "retrieve"):
            return CommentDetailSerializer
        return CommentSerializer


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()

    def get_serializer_class(self):
        if self.action in ("list", "retrieve"):
            return ReviewDetailSerializer
        return ReviewSerializer
