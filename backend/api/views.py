from django.shortcuts import render
from api.models import User, Profile
from api.serializer import UserSerializer, MyTokenSerializer
from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenView(TokenObtainPairView):
    serializer_class = MyTokenSerializer
    
class RegisterView(generics.CreateAPIView):
    serializer_class = 