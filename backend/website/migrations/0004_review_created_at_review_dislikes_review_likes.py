# Generated by Django 5.0.7 on 2024-09-19 16:38

import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0003_coffeeshop_email_coffeeshop_website'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='created_at',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='review',
            name='dislikes',
            field=models.ManyToManyField(blank=True, related_name='review_dislikes', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='review',
            name='likes',
            field=models.ManyToManyField(blank=True, related_name='review_likes', to=settings.AUTH_USER_MODEL),
        ),
    ]