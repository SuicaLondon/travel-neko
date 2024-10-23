# Generated by Django 5.1.2 on 2024-10-22 23:06

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='PlanSection',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('type', models.CharField(max_length=255)),
                ('name', models.CharField(max_length=255)),
                ('address', models.CharField(max_length=255)),
                ('openingTime', models.TimeField()),
                ('time', models.IntegerField()),
                ('shouldBook', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='PlanOnDay',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('day', models.IntegerField()),
                ('plans', models.ManyToManyField(to='plans.plansection')),
            ],
        ),
        migrations.CreateModel(
            name='TravelPlan',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
                ('coverImage', models.ImageField(upload_to='cover_images/')),
                ('mapType', models.CharField(choices=[('google', 'Google Map'), ('apple', 'Open Street Map')], max_length=255)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('updatedAt', models.DateTimeField(auto_now=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='plans', to=settings.AUTH_USER_MODEL)),
                ('plansOnDay', models.ManyToManyField(to='plans.planonday')),
            ],
        ),
    ]
