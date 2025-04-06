from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path
from api import views  

urlpatterns = [
    path('token/', views.MyTokenView.as_view(), name='token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('test/', views.testEndPoint, name='test'),
    path('product/', views.ProductListView.as_view(), name='product_list'),
    path('', views.getRoutes),
]