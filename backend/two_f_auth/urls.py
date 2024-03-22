from django.contrib import admin
from django.urls import path
from two_f_auth import views

urlpatterns = [
    path('set-two-factor-auth/', views.Set2FAView.as_view()),
    path('verify-two-factor-auth/', views.Verify2FAView.as_view()),
]
