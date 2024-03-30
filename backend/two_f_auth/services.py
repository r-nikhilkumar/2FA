from .models import User
import random
import string
import requests, pyotp
from backend.settings import SMS_API, EMAIL_HOST_USER
from django.core.mail import send_mail


def generate_backup_code():
  characters = string.ascii_letters + string.digits
  backup_code = ''.join(random.choice(characters) for _ in range(10))
  return backup_code

def getUserService(request):
 """
 Get the user with a particular user_id
 """
 try:
  data = request.data
  user_id = data.get('user_id', None)
  user = User.objects.get(id = user_id)
  return user
 except:
  return None

def getQRCodeService(user):
 """
 Generate the QR Code image, save the otp_base32 for the user
 """
 otp_base32 = pyotp.random_base32()
 otp_auth_url = pyotp.totp.TOTP(otp_base32).provisioning_uri(
 name=user.username.lower(), issuer_name="localhost.com")

 user.otp_base32 = otp_base32
 user.backup_code = generate_backup_code()
 user.save()
 qr_code = requests.post('http://localhost:8001/get-qr-code/', json = {'otp_auth_url': otp_auth_url}).json()
 
 return qr_code['qr_code_link']

def getLoginUserService(request):
 """
 Return the user id
 """
 data = request.data
 username = data.get('username', None)
 password = data.get('password', None)
 try:
  user = User.objects.get(username = username, password = password)
  return user
 except:
  return None


def getOTPValidityService(user, otp):
 """
 Verify the OTP
 """
 totp = pyotp.TOTP(user.otp_base32)
 if not totp.verify(otp):
  return False
 user.logged_in = True
 user.save()
 return True

def getUserServiceForSMS(request):
  try:
    data = request.data
    user_id = data.get('user_id', None)
    user = User.objects.get(id = user_id)
    if len(str(user.phone_number))<10:
      return "invalid phone number"
    return user
  except:
    return None
def getUserServiceForSMS(request):
  try:
    data = request.data
    user_id = data.get('user_id', None)
    user = User.objects.get(id = user_id)
    if len(user.email)<10:
      return "invalid email"
    return user
  except:
    return None
  
def sendOTP(phone_number):
  try:
    otp_value = random.randint(100000, 999999)
    url = f'https://2factor.in/API/V1/{SMS_API}/SMS/{phone_number}/{otp_value}'
    response = requests.get(url)
    return otp_value
  except Exception as e:
    return e
  
def sendOTPmail(email):
  try:
    otp_value = random.randint(100000, 999999)
    send_mail("2FA OTP",f"Your OTP for 2 factor authentication: {otp_value}", EMAIL_HOST_USER, [email], fail_silently=False)
    return otp_value
  except Exception as e:
    return e
  