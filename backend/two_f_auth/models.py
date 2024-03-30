from django.db import models
import uuid
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
 id =          models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
 otp_base32 =  models.CharField(max_length = 200, null = True)
 logged_in =   models.BooleanField(default = False)
 phone_number = models.IntegerField(max_length = 13, null = True)
 email = models.EmailField(max_length=200)
 sms_otp = models.IntegerField(max_length = 6, null = True, blank=True)
 
 def __str__(self):
  return str(self.username)