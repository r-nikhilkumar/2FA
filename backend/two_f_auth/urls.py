from django.contrib import admin
from django.urls import path
from two_f_auth import views

urlpatterns = [
    path('set-two-factor-auth/', views.Set2FAView.as_view()),
    path('verify-two-factor-auth/', views.Verify2FAView.as_view()),
    path('smsverify/', views.Fetchphone.as_view()),
    path('mailverify/', views.Fetchmail.as_view()),
    path('send-mail-otp/', views.SendOTPMail.as_view()),
    path('verify-sms-otp/', views.VerifySMSOTP.as_view()),
]
