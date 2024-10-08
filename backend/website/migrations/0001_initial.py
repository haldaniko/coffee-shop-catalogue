# Generated by Django 5.0.7 on 2024-09-11 18:33

import django.core.validators
import django.db.models.deletion
import website.models
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('postal_code', models.IntegerField()),
                ('street', models.CharField(max_length=72)),
                ('city', models.CharField(max_length=36)),
            ],
        ),
        migrations.CreateModel(
            name='City',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('city_name', models.CharField(max_length=32)),
                ('map_svg', models.ImageField(upload_to='')),
            ],
        ),
        migrations.CreateModel(
            name='Socials',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('instagram', models.URLField(blank=True, null=True)),
                ('facebook', models.URLField(blank=True, null=True)),
                ('twitter', models.URLField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('type', models.CharField(choices=[('activity', 'Activity'), ('convenience', 'Convenience')], max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='WorkTime',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mon_open', models.TimeField(blank=True, null=True)),
                ('mon_close', models.TimeField(blank=True, null=True)),
                ('tue_open', models.TimeField(blank=True, null=True)),
                ('tue_close', models.TimeField(blank=True, null=True)),
                ('wed_open', models.TimeField(blank=True, null=True)),
                ('wed_close', models.TimeField(blank=True, null=True)),
                ('thu_open', models.TimeField(blank=True, null=True)),
                ('thu_close', models.TimeField(blank=True, null=True)),
                ('fri_open', models.TimeField(blank=True, null=True)),
                ('fri_close', models.TimeField(blank=True, null=True)),
                ('sat_open', models.TimeField(blank=True, null=True)),
                ('sat_close', models.TimeField(blank=True, null=True)),
                ('sun_open', models.TimeField(blank=True, null=True)),
                ('sun_close', models.TimeField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='CoffeeShop',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('phone', models.CharField(blank=True, max_length=20, null=True)),
                ('image', models.ImageField(blank=True, upload_to=website.models.image_file_path)),
                ('description', models.CharField(max_length=1024)),
                ('price_rate', models.IntegerField(validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(3)])),
                ('is_network', models.BooleanField()),
                ('address', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='website.address')),
                ('city', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='website.city')),
                ('owner', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('socials', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='website.socials')),
                ('tags', models.ManyToManyField(related_name='coffee_shops', to='website.tag')),
                ('work_time', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='website.worktime')),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(blank=True, max_length=512, null=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('shop', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='website.coffeeshop')),
            ],
        ),
        migrations.CreateModel(
            name='GalleryImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to=website.models.gallerry_image_file_path)),
                ('coffee_shop', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='gallery_images', to='website.coffeeshop')),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(blank=True, max_length=512, null=True)),
                ('stars', models.IntegerField(validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(5)])),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('shop', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='website.coffeeshop')),
            ],
        ),
    ]
