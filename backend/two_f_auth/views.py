from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions, status
from rest_framework.decorators import api_view
from .services import getQRCodeService, getUserService, getLoginUserService, getOTPValidityService, getUserServiceForSMS, sendOTP, sendOTPmail
# from django.contrib.auth.models import User
from .models import User
from two_f_auth.serializer import UserSerializer

class RegisterView(APIView):
 serializer_class = UserSerializer
 queryset = User.objects.all()

 def post(self, request):
  serializer = self.serializer_class(data = request.data)
  if serializer.is_valid():
   serializer.save()
   return Response({ "user_id": serializer.data['id'], "status": "Registration successful", "message": "Registered successfully, please login" }, 
    status=status.HTTP_201_CREATED)
  else:
   return Response({ "status": "Registration failed", "message": str(serializer.errors) }, 
    status=status.HTTP_400_BAD_REQUEST)

class Set2FAView(APIView):
 """
 Get the image of the QR Code
 """
 def post(self, request):
  user = getUserService(request)
  if user == None:
   return Response({"status": "fail", "message": f"No user with the corresponding username and password exists" }, 
    status=status.HTTP_404_NOT_FOUND)
  
  qr_code = getQRCodeService(user)
  return Response({"qr_code": qr_code})

class LoginView(APIView):
 def post(self, request, *args, **kwargs):
  user = getLoginUserService(request)
  if user == None:
   return Response({
    "status": "Login failed", 
    "message": f"No user with the corresponding username and password exists"
    }, 
    status=status.HTTP_404_NOT_FOUND)
  return Response({ "status": "Logined In", 'user_id': user.id })

class Verify2FAView(APIView):
 serializer_class = UserSerializer
 queryset = User.objects.all()

 def post(self, request):
  user = getUserService(request)
  if user == None:
   return Response({ "status": "Verification failed", "message": f"No user with the corresponding username and password exists"}, 
    status=status.HTTP_404_NOT_FOUND)

  valid_otp = getOTPValidityService(user, request.data.get('otp', None))
  if not valid_otp:
   return Response({ "status": "Verification failed", "message": "OTP is invalid or already used" }, 
    status=status.HTTP_400_BAD_REQUEST)
  return Response({ "status": "Verified", 'otp_verified': "true" })

class Fetchphone(APIView):
  def post(self, request):
    user = getUserServiceForSMS(request)
    if user == None:
      return Response({ "status": "Verification failed", "message": f"No user with the corresponding username and password exists"}, 
      status=status.HTTP_404_NOT_FOUND)
    if user == "invalid phone number":
      return Response({ "status": "phone not found", "message" : "Register your phone number first!"})
    return Response({"status":"ok","user_phone":user.phone_number})

class Fetchmail(APIView):
  def post(self, request):
    user = getUserServiceForSMS(request)
    if user == None:
      return Response({ "status": "Verification failed", "message": f"No user with the corresponding username and password exists"}, 
      status=status.HTTP_404_NOT_FOUND)
    if user == "invalid email":
      return Response({ "status": "email not found", "message" : "Register your email first!"})
    return Response({"status":"ok","mail":user.email})

class SendOTP(APIView):
  def post(self, request):
    user = getUserService(request)
    if user == None:
      return Response({ "status": "Verification failed", "message": f"No user with the corresponding username and password exists"}, 
      status=status.HTTP_404_NOT_FOUND)
    otp = sendOTP(user.phone_number)
    print(otp)
    user.sms_otp = otp
    user.save()
    return Response({"status":"ok", "message":"otp sent"})
  
class SendOTPMail(APIView):
  def post(self, request):
    user = getUserService(request)
    if user == None:
      return Response({ "status": "Verification failed", "message": f"No user with the corresponding username and password exists"}, 
      status=status.HTTP_404_NOT_FOUND)
    otp = sendOTPmail(user.email)
    user.sms_otp = otp
    user.save()
    return Response({"status":"ok", "message":"otp sent"})

class VerifySMSOTP(APIView):
  def post(self, request):
    user = getUserService(request)
    if user == None:
      return Response({ "status": "Verification failed", "message": f"No user with the corresponding username and password exists"}, 
      status=status.HTTP_404_NOT_FOUND)
    if(str(user.sms_otp) == request.data['otp']):
      return Response({"status":"ok"})
    return Response({"status":"verification failed","message":"Invalid OTP"})
    
