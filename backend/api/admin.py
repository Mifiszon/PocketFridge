from django.contrib import admin
from api.models import User, Profile, Product

class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email']
    
class ProfileAdmin(admin.ModelAdmin):
    list_editable = ['verified']
    list_display = ['user', 'full_name', 'verified']
    
class ProductAdmin(admin.ModelAdmin):
    list_display = ['user', 'name', 'expirationDate', 'quantity', 'status']
    
admin.site.register(User, UserAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(Product, ProductAdmin)
