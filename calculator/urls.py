from django.urls import path
from .views import (
    calculate_tax_view, signup_view, login_view,
    calculate_hra_view, calculate_advance_tax_view, 
    calculate_tds_view, calculate_80c_view,
    calculate_salary_breakdown_view, calculate_composition_scheme_view,
    chat_view
)

urlpatterns = [
    path('calculate-tax/', calculate_tax_view, name='calculate-tax'),
    path('auth/signup/', signup_view, name='signup'),
    path('auth/login/', login_view, name='login'),
    # New Tools
    path('calculate-hra/', calculate_hra_view, name='calculate-hra'),
    path('calculate-advance-tax/', calculate_advance_tax_view, name='calculate-advance-tax'),
    path('calculate-tds/', calculate_tds_view, name='calculate-tds'),
    path('calculate-80c/', calculate_80c_view, name='calculate-80c'),
    path('calculate-salary-breakdown/', calculate_salary_breakdown_view, name='calculate-salary-breakdown'),
    path('calculate-composition-scheme/', calculate_composition_scheme_view, name='calculate-composition-scheme'),
    path('chat/', chat_view, name='chat'),
]