from django.shortcuts import render
from api.models import User, Product
from api.serializer import UserSerializer, MyTokenSerializer, RegisterSerializer, ProductaSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework import generics, status
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from api.models import STATUS
from django.core.mail import send_mail
from django.conf import settings
from django.http import HttpResponse
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

class MyTokenView(TokenObtainPairView):
    serializer_class = MyTokenSerializer
    
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer
    
@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/'
    ]
    return Response(routes)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_status_choices(request):
    return Response([{"value": val, "label": label} for val, label in STATUS])

    
@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def dailyTip(request):
    tip = random.choice(TIPS)
    return Response({'tip': tip}, status=status.HTTP_200_OK)

class ProductListView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductaSerializer
    
    def get_queryset(self):
        user_id = self.kwargs['user_id']
        user = User.objects.get(id = user_id)
        
        product = Product.objects.filter(user=user)
        
        return product
        
class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProductaSerializer
    
    def get_object(self):
        user_id = self.kwargs['user_id']
        product_id = self.kwargs['product_id']
        
        user = User.objects.get(id = user_id)
        product = Product.objects.get(id = product_id, user = user)
        
        return product
    
class ProductStatus(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProductaSerializer
    
    def get_object(self):
        user_id = self.kwargs['user_id']
        product_id = self.kwargs['product_id']
        
        user = User.objects.get(id = user_id)
        product = Product.objects.get(id = product_id, user = user)
        
        product.status = 'used'
        product.save()
        
        return product
    
def send_test_email():
    subject = 'Test powiadomienia'
    message = 'To jest testowy e-mail od Pocket Fridge!'
    from_email = settings.EMAIL_HOST_USER
    recipient_list = ['mifiszon@gmail.com']

    send_mail(subject, message, from_email, recipient_list)
    
def test_email_view(request):
    send_test_email()
    return HttpResponse("Wysłano testowy mail!")