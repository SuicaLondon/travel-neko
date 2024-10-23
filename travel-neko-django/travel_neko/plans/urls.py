from django.urls import path
from .views import TravelPlanListCreateView, TravelPlanDeleteView

urlpatterns = [
    path('plans/', TravelPlanListCreateView.as_view(), name='plan-list'),
    path('plans/<int:pk>/', TravelPlanDeleteView.as_view(), name='delete-plan'),
]
