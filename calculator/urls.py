from django.urls import path
from .views import calculate_tax_view

urlpatterns = [
    path('calculate-tax/', calculate_tax_view, name='calculate-tax'),
]