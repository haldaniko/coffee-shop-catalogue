# Generated by Django 5.0.7 on 2024-09-19 17:12

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0005_address_district'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='title',
            field=models.CharField(default=django.utils.timezone.now, max_length=72),
            preserve_default=False,
        ),
    ]