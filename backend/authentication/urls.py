from django.urls import path
from .views import (
    RegisterView,
    LoginView,
    LogoutView,
    UserGetAll,
    UserCreate,
    UserCRUD,
    VerifyEmail,
    UserGetById,
    IsSignedIn,
    isVerfied
)

urlpatterns = [
    path('auth/register', RegisterView.as_view()),
    path('auth/login', LoginView.as_view()),
    path('auth/logout', LogoutView.as_view(), name='logout'),
    path('signed/', IsSignedIn.as_view(), name='verfiy_signed_in'),
    path('users/', UserGetAll.as_view(), name='user_get_all'),
    path('user/create', UserCreate.as_view(), name='user_create'),
    path('user/', UserCRUD.as_view(), name='user_crud'),
    path('user/<uuid:id>', UserGetById.as_view(), name='user_crud'),
    path('auth/verify/', VerifyEmail.as_view(), name='verify_email'),
    path('auth/is-verified', isVerfied.as_view(), name='is_verfied'),
]