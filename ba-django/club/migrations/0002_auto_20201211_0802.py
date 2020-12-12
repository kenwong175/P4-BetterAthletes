# Generated by Django 3.1.4 on 2020-12-11 08:02

import django.contrib.postgres.fields
import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('club', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='workout',
            name='exercise',
            field=django.contrib.postgres.fields.ArrayField(base_field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=50), size=None), size=None),
        ),
        migrations.AlterField(
            model_name='workout',
            name='reps',
            field=django.contrib.postgres.fields.ArrayField(base_field=django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(blank=True, validators=[django.core.validators.MinValueValidator(1)]), size=None), size=None),
        ),
        migrations.AlterField(
            model_name='workout',
            name='targets',
            field=django.contrib.postgres.fields.ArrayField(base_field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=50), size=None), size=None),
        ),
    ]