# Generated by Django 2.0.4 on 2018-04-16 17:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('responses', '0009_news'),
    ]

    operations = [
        migrations.AlterField(
            model_name='news',
            name='overview',
            field=models.CharField(max_length=2000),
        ),
    ]