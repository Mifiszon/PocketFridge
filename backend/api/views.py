from django.shortcuts import render
from api.models import User, Product, Category
from api.serializer import UserSerializer, MyTokenSerializer, RegisterSerializer, ProductaSerializer, CategorySerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework import generics, status
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from api.utils import send_test_email, send_expiry_reminder_email
from django.http import HttpResponse
from datetime import datetime, timedelta
from background_task.models import Task
from .tasks import daily_expiry_check
import random

TIPS = [
    "Plan your meals ahead to avoid buying unnecessary food.",
    "Freeze leftovers or food that might go bad soon.",
    "Use scraps to make soups, casseroles, or stir-fries.",
    "Organize your fridge so that older items are in front.",
    "Store fruits and vegetables properly – not everything belongs in the fridge.",
    "Turn overripe fruits into smoothies or jams.",
    "Don’t rely only on expiration dates – use your senses too.",
    "Keep a list of what’s in your fridge and pantry to avoid double-buying.",
    "Cook in larger batches and store portions for later.",
    "Buy loose produce so you can choose exactly how much you need."
]

#widok logowania z rozszerzonym tokenem
class MyTokenView(TokenObtainPairView):
    serializer_class = MyTokenSerializer

#widok rejestracji    
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

#lista kategorii    
class CategoryView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

#tworzenie kategorii przez POST i walidacja    
@api_view(['POST'])
def createCategory(request):
    name = request.data.get('name')
    if not name:
        return Response({'error': 'Category name is required'}, status=status.HTTP_400_BAD_REQUEST)
    if Category.objects.filter(name=name).exists():
        return Response({'error': 'Category already exists'}, status=status.HTTP_400_BAD_REQUEST)
    category = Category.objects.create(name=name)
    return Response({'id': category.id, 'name': category.name}, status=status.HTTP_201_CREATED)

#test    
@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/'
    ]
    return Response(routes)

#losowanie porady z listy    
@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def dailyTip(request):
    tip = random.choice(TIPS)
    return Response({'tip': tip}, status=status.HTTP_200_OK)

#lista produktów
class ProductListView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductaSerializer
    
    def get_queryset(self):
        user_id = self.kwargs['user_id']
        user = User.objects.get(id = user_id)
        
        product = Product.objects.filter(user=user)
        
        return product

#widok 1 produktu        
class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProductaSerializer
    
    def get_object(self):
        user_id = self.kwargs['user_id']
        product_id = self.kwargs['product_id']
        
        user = User.objects.get(id = user_id)
        product = Product.objects.get(id = product_id, user = user)
        
        return product

#zmiana statusu na otwarty    
class ProductOpened(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProductaSerializer
    
    def get_object(self):
        user_id = self.kwargs['user_id']
        product_id = self.kwargs['product_id']
        
        user = User.objects.get(id = user_id)
        product = Product.objects.get(id = product_id, user = user)
        
        product.opened = True
        product.save()
        
        return product
 
#test   
def test_email_view(request):
    send_expiry_reminder_email()
    return HttpResponse("test")

#funkcja do wysyłania maila o 7
def schedule_task():
    now = datetime.now()
    next_run_time = now.replace(hour=7, minute=0, second=0, microsecond=0)

    if now > next_run_time:
        next_run_time += timedelta(days=1)

    daily_expiry_check(schedule=next_run_time)

#test
daily_expiry_check()
