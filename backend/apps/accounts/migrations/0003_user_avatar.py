# Generated by Django 4.1.2 on 2022-12-19 23:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0002_user_groups_user_user_permissions"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="avatar",
            field=models.URLField(blank=True, null=True),
        ),
    ]
