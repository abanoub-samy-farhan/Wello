# Generated by Django 5.1.4 on 2024-12-30 06:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0004_user_address'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='address',
            field=models.CharField(default=None, max_length=255, null=True),
        ),
    ]
