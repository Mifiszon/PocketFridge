from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save

UNITS = [
    ('g', 'gramy'),
    ('kg', 'kilogramy'),
    ('ml', 'mililitry'),
    ('l', 'litry'),
    ('szt', 'sztuki'),
    ('opak', 'opakowanie'),
]

class User(AbstractUser):
    username = models.CharField(max_length=50)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username
    
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=255)
    bio = models.CharField(max_length=1000)
    image = models.FileField(default='default.jpg', upload_to='user_img')
    verified = models.BooleanField(default=False)
    
    def __str__(self):
        return self.full_name
    
class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    addDate = models.DateTimeField(auto_now_add=True)
    expirationDate = models.DateTimeField()
    quantity = models.FloatField()
    unit = models.CharField(max_length=100, choices=UNITS, default='szt')
    category = models.CharField(max_length=200)
    opened = models.BooleanField(default=False)
    
    def __str__(self):
        return self.name
    

    
def create_user_prof(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
        
def save_user_prof(sender, instance, **kwargs):
    instance.profile.save()

post_save.connect(create_user_prof, sender=User)
post_save.connect(save_user_prof, sender=User)