# Generated by Django 5.0.3 on 2024-03-29 12:11

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("two_f_auth", "0003_user_sms_otp"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="sms_otp",
            field=models.IntegerField(max_length=6, null=True),
        ),
    ]
