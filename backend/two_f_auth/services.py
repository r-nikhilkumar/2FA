from .models import User
import requests, pyotp

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