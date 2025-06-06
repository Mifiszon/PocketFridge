from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save

#rozszerzenie klasy usera
class User(AbstractUser):
    username = models.CharField(max_length=50)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username
 
#klasa profilu dla usera     
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=255)
    bio = models.CharField(max_length=1000)
    image = models.FileField(default='default.jpg', upload_to='user_img')
    verified = models.BooleanField(default=False)
    
    def __str__(self):
        return self.full_name

#klasa kategorii dla produktu    
class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

#klasa pojedynczego produktu powiazana z uzytkownikiem i kategoria
class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    addDate = models.DateTimeField(auto_now_add=True)
    expirationDate = models.DateTimeField()
    quantity = models.FloatField()
    unit = models.CharField(max_length=100, default='pcs')
    opened = models.BooleanField(default=False)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    
    def __str__(self):
        return self.name

    
def create_user_prof(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
        
def save_user_prof(sender, instance, **kwargs):
    instance.profile.save()

#automatyczne tworzenia usera
post_save.connect(create_user_prof, sender=User)
post_save.connect(save_user_prof, sender=User)