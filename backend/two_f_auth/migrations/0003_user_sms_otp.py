# Generated by Django 5.0.3 on 2024-03-29 09:20

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("two_f_auth", "0002_user_phone_number"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="sms_otp",
            field=models.IntegerField(default=0, max_length=6),
            preserve_default=False,
        ),
    ]