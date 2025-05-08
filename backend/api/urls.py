from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path
from api import views  

urlpatterns = [
    path('token/', views.MyTokenView.as_view(), name='token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('daily-tip/', views.dailyTip, name='daily-tip'),
    path('product/<user_id>/', views.ProductListView.as_view(), name='product-list'),
    path('product-detail/<user_id>/<product_id>/', views.ProductDetailView.as_view(), name = 'product-detial'),
    path('product-opened/<user_id>/<product_id>/', views.ProductOpened.as_view(), name = 'product-opened'),
    path('categories/', views.CategoryView.as_view(), name= 'categories'),
    path('create-category/', views.createCategory, name= 'create-category'),
    path('send-test-email/', views.test_email_view),
    path('', views.getRoutes),
]