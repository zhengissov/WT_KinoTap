# Generated by Django 2.0.4 on 2018-04-15 09:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('responses', '0004_auto_20180415_1357'),
    ]

    operations = [
        migrations.AddField(
            model_name='cast',
            name='movie',
            field=models.ManyToManyField(to='responses.Movie'),
        ),
    ]
