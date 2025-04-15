from django.shortcuts import render
from api.models import User, Product
from api.serializer import UserSerializer, MyTokenSerializer, RegisterSerializer, ProductaSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework import generics, status
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from api.models import STATUS

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
@permission_classes([IsAuthenticated])
def dailyTip(request):
    if request.method == 'GET':
        data = f"Congratulations {request.user}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = "Hello buddy"
        data = f'Congratulations your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)

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