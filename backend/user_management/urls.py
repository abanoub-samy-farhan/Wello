from django.urls import path
from .views import UserGetAll, UserCreate, UserCRUD

urlpatterns = [
    path('users/', UserGetAll.as_view(), name='user_get_all'),
    path('user/create', UserCreate.as_view(), name='user_create'),
    path('user/<uuid:user_id>', UserCRUD.as_view(), name='user_crud'),
]