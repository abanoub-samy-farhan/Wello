from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('payment_methods.urls'), name='payment-methods'),
    path('api/', include('authentication.urls'), name='auth'),
    path('api/', include('transactions.urls'), name='transactions'),
    path('api/', include('notifications.urls'), name='notifications'),
    path('api/', include('chatbot.urls'), name='chatbot'),
]
