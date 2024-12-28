from django.urls import path
from .views import TransactionByUserId, CreateTransaction, TransactionResolveRequest

urlpatterns = [
    path('transactions/', TransactionByUserId.as_view()),
    path('transaction/create/', CreateTransaction.as_view()),
    path('transaction/resolve/', TransactionResolveRequest.as_view())
]