from django.urls import path
from .views import PaymentGetAll, PaymentGetByUserId, PaymentGetById, PaymentUpdate, PaymentCreate, PaymentSwitchPrimaryMethod, PaymentDelete

urlpatterns = [
    path('payment/get-all/', PaymentGetAll.as_view(), name='payment-get-all'),
    path('payment/get-by-user-id/', PaymentGetByUserId.as_view(), name='payment-get-by-user-id'),
    path('payment/get-by-id/', PaymentGetById.as_view(), name='payment-get-by-id'),
    path('payment/update/', PaymentUpdate.as_view(), name='payment-update'),
    path('payment/create/', PaymentCreate.as_view(), name='payment-create'),
    path('payment/switch-primary-method/', PaymentSwitchPrimaryMethod.as_view(), name='payment-switch-primary-method'),
    path('payment/delete/', PaymentDelete.as_view(), name='payment-delete'),
]