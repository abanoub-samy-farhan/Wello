from django.urls import path
from .views import RegisterView, LoginView, LogoutView, UserGetAll, UserCreate, UserCRUD

urlpatterns = [
    path('auth/register', RegisterView.as_view()),
    path('auth/login', LoginView.as_view()),
    path('auth/logout', LogoutView.as_view()),
    path('users/', UserGetAll.as_view(), name='user_get_all'),
    path('user/create', UserCreate.as_view(), name='user_create'),
    path('user/', UserCRUD.as_view(), name='user_crud'),
]