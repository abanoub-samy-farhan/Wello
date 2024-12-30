# Generated by Django 5.1.4 on 2024-12-29 02:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0002_user_last_login'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='verification_token',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='verification_token',
            name='expriy_at',
        ),
        migrations.RemoveField(
            model_name='verification_token',
            name='is_active',
        ),
        migrations.RemoveField(
            model_name='verification_token',
            name='user_id',
        ),
        migrations.AddField(
            model_name='verification_token',
            name='email',
            field=models.EmailField(default=None, max_length=100),
        ),
    ]