from django.utils.deprecation import MiddlewareMixin
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from decouple import config
import jwt

class JWTMiddleware(MiddlewareMixin):
    def process_request(self, request):
        token = request.COOKIES.get('jwt')
        if token:
            try:
                payload = jwt.decode(token, config('JWT_SECRET'), algorithms=['HS256'])
                request.user = payload
            except jwt.ExpiredSignatureError:
                return Response({'message': 'Token expired'}, status=status.HTTP_401_UNAUTHORIZED)
            except jwt.InvalidTokenError:
                return Response({'message': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            request.user = None
