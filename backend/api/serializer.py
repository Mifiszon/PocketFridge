from api.models import User, Product, Category
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers

#serializer do kategorii
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

#serializer do produktu - dane o produkcie + kategoria
class ProductaSerializer(serializers.ModelSerializer):
    category = CategorySerializer
    
    class Meta:
        model = Product
        fields = ['id', 'user', 'name', 'expirationDate', 'opened', 'quantity', 'unit', 'category']
        extra_kwargs = {
            'unit': {'required': False},
            'opened': {'required': False},
        }


#serializer uzytkownika z kluczowymi polami
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

#dodatkowe dane z profilu do tokenu JWT        
class MyTokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        token['full_name'] = user.profile.full_name
        token['username'] = user.username
        token['email'] = user.email
        token['bio'] = user.profile.bio
        token['image'] = str(user.profile.image)
        token['verified'] = user.profile.verified
        
        return token

#tworzenie konta uzytkownika + walidacja    
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True, required = True, validators = [validate_password])
    password2 = serializers.CharField(write_only = True, required = True)
    
    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'password2']
        
    def validate(self, attributes):
        if attributes['password'] != attributes['password2']:
            raise serializers.ValidationError({"password": "Password fields does not match"})
        return attributes
    
    def create(self, validated_data):
        user = User.objects.create(username = validated_data['username'], email = validated_data['email'])
        user.set_password(validated_data['password'])
        user.save()
        return user