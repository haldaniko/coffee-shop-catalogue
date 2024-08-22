from rest_framework import serializers
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
from user.serializers import UserSerializer


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
        fields = '__all__'


class WorkTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkTime
        fields = '__all__'


class CoffeeShopSerializer(serializers.ModelSerializer):
    address = AddressSerializer()

    class Meta:
        model = CoffeeShop
        fields = ("name", "phone", "image", "description", "address")

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


class CoffeeShopDetailSerializer(serializers.ModelSerializer):
    work_time = WorkTimeSerializer()
    tags = TagSerializer(many=True)
    socials = SocialsSerializer()
    owner = UserSerializer()
    address = AddressSerializer()

    class Meta:
        model = CoffeeShop
        fields = ("name",
                  "phone",
                  "image",
                  "description",
                  "work_time",
                  "tags",
                  "socials",
                  "owner",
                  "address")


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


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ("text", "stars", "shop")


class ReviewDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ("text", "stars", "author", "shop")
