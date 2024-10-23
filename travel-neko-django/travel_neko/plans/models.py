from django.db import models
from django.contrib.auth.models import User

class PlanSection(models.Model):
    id = models.AutoField(primary_key=True)
    type = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    openingTime = models.TimeField()
    time = models.IntegerField()
    shouldBook = models.BooleanField()
    
    def __str__(self):
        return self.name

class PlanOnDay(models.Model):
    id = models.AutoField(primary_key=True)
    day = models.IntegerField()
    plans = models.ManyToManyField(PlanSection)

    def __str__(self):
        return f"Day {self.day}"

class TravelPlan(models.Model):
    class MapType(models.TextChoices):
        google = 'google', 'Google Map'
        apple = 'apple', 'Open Street Map'

    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    coverImage = models.ImageField(upload_to='cover_images/')
    mapType = models.CharField(max_length=255, choices=MapType)
    plansOnDay = models.ManyToManyField(PlanOnDay)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='plans')
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    

    
    
