from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data.get('email', ''),
            **validated_data
        )
        return user

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.is_owner = validated_data.get('is_owner', instance.is_owner)
        instance.photo = validated_data.get('photo', instance.photo)

        password = validated_data.get('password')
        if password:
            instance.set_password(password)

        instance.save()
        return instance
