# Generated by Django 5.0.7 on 2024-09-19 16:48

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0004_review_created_at_review_dislikes_review_likes'),
    ]

    operations = [
        migrations.AddField(
            model_name='address',
            name='district',
            field=models.CharField(default=django.utils.timezone.now, max_length=72),
            preserve_default=False,
        ),
    ]
