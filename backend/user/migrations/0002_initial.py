# Generated by Django 5.0.7 on 2024-09-01 18:02

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('user', '0001_initial'),
        ('website', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='favorite_shops',
            field=models.ManyToManyField(blank=True, related_name='favorited_by', to='website.coffeeshop'),
        ),
        migrations.AddField(
            model_name='user',
            name='groups',
            field=models.ManyToManyField(blank=True, help_text='The groups this user belongs to.', related_name='custom_user_set', to='auth.group'),
        ),
        migrations.AddField(
            model_name='user',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='custom_user_permissions_set', to='auth.permission'),
        ),
    ]
