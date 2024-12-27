from django.urls import path
from .views import NotificaitonByUserID
urlpatterns = [
    path('notifications/', NotificaitonByUserID.as_view(), name='notifications'),
]