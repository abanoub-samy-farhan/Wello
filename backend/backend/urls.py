from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('user_management.urls'), name='user-management'),
    path('api/', include('payment_methods.urls'), name='payment-methods'),
]
