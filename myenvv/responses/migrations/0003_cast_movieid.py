# Generated by Django 2.0.4 on 2018-04-14 19:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('responses', '0002_cast'),
    ]

    operations = [
        migrations.AddField(
            model_name='cast',
            name='movieId',
            field=models.IntegerField(default=0),
        ),
    ]
