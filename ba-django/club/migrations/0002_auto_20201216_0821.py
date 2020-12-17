# Generated by Django 3.1.4 on 2020-12-16 08:21

from django.conf import settings
import django.contrib.postgres.fields
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('club', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='workouttemplate',
            name='reps',
            field=django.contrib.postgres.fields.ArrayField(base_field=django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(blank=True, validators=[django.core.validators.MinValueValidator(0)]), size=None), size=None),
        ),
        migrations.CreateModel(
            name='WorkoutComment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment', models.TextField(null=True)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user_comment', to=settings.AUTH_USER_MODEL)),
                ('workout', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='club.workout')),
                ('workout_result', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='result_comments', to='club.workoutresult')),
            ],
        ),
    ]