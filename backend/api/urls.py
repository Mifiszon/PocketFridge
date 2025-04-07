from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path
from api import views  

urlpatterns = [
    path('token/', views.MyTokenView.as_view(), name='token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('test/', views.testEndPoint, name='test'),
    path('product/<user_id>/', views.ProductListView.as_view(), name='product-list'),
    path('product-detail/<user_id>/<product_id>/', views.ProductDetailView.as_view(), name = 'product-detial'),
    path('product-status/<user_id>/<product_id>/', views.ProductStatus.as_view(), name = 'product-status'),
    path('', views.getRoutes),
]