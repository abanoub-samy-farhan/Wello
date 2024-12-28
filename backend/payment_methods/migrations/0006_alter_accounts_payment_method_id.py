# Generated by Django 5.1.4 on 2024-12-28 17:08

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payment_methods', '0005_accounts'),
    ]

    operations = [
        migrations.AlterField(
            model_name='accounts',
            name='payment_method_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='payment_methods.paymentmethod', unique=True),
        ),
    ]