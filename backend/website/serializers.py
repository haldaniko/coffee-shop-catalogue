from django.db.models import Avg
from rest_framework import serializers
from .models import (
    Tag,
    Socials,
    Address,
    WorkTime,
    CoffeeShop,
    GalleryImage,
    Comment,
    Review, City
)
from user.serializers import UserSerializer

from .pagination import ReviewPagination


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class SocialsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Socials
        fields = '__all__'


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ("city", "postal_code", "street")


class WorkTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkTime
        fields = '__all__'


class CoffeeShopSerializer(serializers.ModelSerializer):
    address = AddressSerializer()

    class Meta:
        model = CoffeeShop
        fields = ("id", "name", "phone", "image", "description", "address")

    def create(self, validated_data):
        work_time_data = validated_data.pop('work_time', {})
        socials_data = validated_data.pop('socials', {})
        address_data = validated_data.pop('address', {})

        work_time = WorkTime.objects.create(**work_time_data)
        socials = Socials.objects.create(**socials_data)
        address = Address.objects.create(**address_data)

        coffee_shop = CoffeeShop.objects.create(
            work_time=work_time,
            socials=socials,
            address=address,
            **validated_data
        )

        return coffee_shop

    def update(self, instance, validated_data):
        work_time_data = validated_data.pop('work_time', None)
        socials_data = validated_data.pop('socials', None)
        address_data = validated_data.pop('address', None)

        if work_time_data:
            for attr, value in work_time_data.items():
                setattr(instance.work_time, attr, value)
            instance.work_time.save()

        if socials_data:
            for attr, value in socials_data.items():
                setattr(instance.socials, attr, value)
            instance.socials.save()

        if address_data:
            for attr, value in address_data.items():
                setattr(instance.address, attr, value)
            instance.address.save()

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance


class ReviewSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()

    class Meta:
        model = Review
        fields = ['text', 'stars', 'author']


class CoffeeShopDetailSerializer(serializers.ModelSerializer):
    work_time = WorkTimeSerializer()
    tags = TagSerializer(many=True)
    socials = SocialsSerializer()
    owner = UserSerializer()
    address = AddressSerializer()

    rating = serializers.SerializerMethodField()
    evaluations = serializers.SerializerMethodField()
    reviews = serializers.SerializerMethodField()


    class Meta:
        model = CoffeeShop
        fields = ("name",
                  "rating",
                  "evaluations",
                  "owner",
                  "work_time",
                  "image",
                  "description",
                  "price_rate",
                  "is_network",
                  "tags",
                  "phone",
                  "email",
                  "website",
                  "address",
                  "socials",
                  "reviews",
                  )

    def get_rating(self, obj):
        return getattr(obj, 'average_rating', None)

    def get_evaluations(self, obj):
        return getattr(obj, 'evaluations_count', 0)

    def get_reviews(self, obj):
        request = self.context.get('request')
        reviews = Review.objects.filter(shop=obj).order_by('-id')
        paginator = ReviewPagination()
        page = paginator.paginate_queryset(reviews, request)
        return paginator.get_paginated_response(ReviewSerializer(page, many=True).data).data


class CoffeeShopListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoffeeShop
        fields = ("name", "phone", "image", "description", "address")


class GalleryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryImage
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ("text", "shop")


class CommentDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ("author", "text", "shop")


class ReviewDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ("text", "stars", "author", "shop")


class CityStatsSerializer(serializers.ModelSerializer):
    shops = serializers.SerializerMethodField()
    owners = serializers.SerializerMethodField()
    evaluations = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()

    class Meta:
        model = City
        fields = ['id', 'city_name', 'map_svg', 'shops', 'owners', 'evaluations', 'comments']

    def get_shops(self, obj):
        return CoffeeShop.objects.filter(city=obj).count()

    def get_owners(self, obj):
        return CoffeeShop.objects.filter(city=obj).values('owner').distinct().count()

    def get_evaluations(self, obj):
        return Review.objects.filter(shop__city=obj).count()

    def get_comments(self, obj):
        return Comment.objects.filter(shop__city=obj).count()


class IndexCoffeeShopSerializer(serializers.ModelSerializer):
    rating = serializers.SerializerMethodField()
    owner = serializers.SerializerMethodField()
    address = AddressSerializer()

    class Meta:
        model = CoffeeShop
        fields = ['id', 'name', 'address', 'rating', 'image', 'price_rate', 'owner']

    def get_rating(self, obj):
        average_rating = Review.objects.filter(shop=obj).aggregate(average_rating=Avg('stars'))['average_rating']
        return average_rating if average_rating is not None else None

    def get_owner(self, obj):
        return obj.owner is not None
