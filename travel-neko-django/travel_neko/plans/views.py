from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .models import TravelPlan
from .serializers import TravelPlanSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny



class TravelPlanListCreateView(generics.ListCreateAPIView):
    serializer_class = TravelPlanSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return TravelPlan.objects.filter(author=self.request.user)

    def perform_create(self, serializer):
        if (serializer.is_valid()):
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class TravelPlanDeleteView(generics.DestroyAPIView):
    serializer_class = TravelPlanSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return TravelPlan.objects.filter(author=self.request.user)
     