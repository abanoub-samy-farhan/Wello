# Generated by Django 5.1.4 on 2024-12-28 04:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payment_methods', '0003_alter_paymentmethod_expiry_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='paymentmethod',
            name='card_number',
            field=models.CharField(blank=True, max_length=100, null=True, unique=True),
        ),
    ]
