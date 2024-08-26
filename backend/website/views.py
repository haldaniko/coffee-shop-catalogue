from django.db.models import Avg, Q
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
    serializer_class = CoffeeShopSerializer

    def get_queryset(self):
        queryset = super().get_queryset()

        city = self.request.query_params.get("city")
        name = self.request.query_params.get("name")
        address = self.request.query_params.get("address")
        with_owner = self.request.query_params.get("with_owner")
        tags = self.request.query_params.get("tags")
        min_rating = self.request.query_params.get("min_rating")
        max_rating = self.request.query_params.get("max_rating")

        if city:
            queryset = queryset.filter(address__city__icontains=city)
        if name:
            queryset = queryset.filter(name__icontains=name)
        if address:
            queryset = queryset.filter(address__street__icontains=address)
        if with_owner is not None:
            has_owner = with_owner.lower() == "true"
            queryset = queryset.filter(owner__isnull=not has_owner)
        if tags:
            tags_list = tags.split(',')
            for i in tags_list:
                queryset = queryset.filter(tags__name__icontains=i)

        if min_rating is not None or max_rating is not None:
            min_rating = int(min_rating) if min_rating is not None else None
            max_rating = int(max_rating) if max_rating is not None else None
            rating_filter = Q()
            if min_rating is not None:
                rating_filter &= Q(review__stars__gte=min_rating)
            if max_rating is not None:
                rating_filter &= Q(review__stars__lte=max_rating)
            queryset = queryset.annotate(
                average_rating=Avg('review__stars')
            ).filter(rating_filter)

        return queryset

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
