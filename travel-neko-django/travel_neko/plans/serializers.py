from django.contrib.auth.models import User
from rest_framework import serializers
from .models import PlanOnDay, PlanSection, TravelPlan

class TravelPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = TravelPlan
        fields = ['id', 'title', 'coverImage', 'mapType', 'plansOnDay', 'author', 'createdAt', 'updatedAt']
        extra_kwargs = {'author': {'read_only': True}}

class PlanOnDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = PlanOnDay
        fields = ['id', 'day', 'plans']

class PlanSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlanSection
        fields = ['id', 'type', 'name', 'address', 'openingTime', 'time', 'shouldBook']
