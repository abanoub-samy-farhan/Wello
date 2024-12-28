from django.utils.deprecation import MiddlewareMixin
from django.http import JsonResponse
from django.conf import settings
from decouple import config
import jwt

class JWTMiddleware(MiddlewareMixin):
    def process_request(self, request):
        if request.path in ['/api/auth/login', '/api/auth/register']:
            return None
        
        token = request.COOKIES.get('jwt')
        if not token:
            return JsonResponse({'message': 'User not authenticated'}, status=401)
        
        try:
            payload = jwt.decode(token, config('JWT_SECRET'), algorithms=['HS256'])
            request.user_id = payload['id']
            if not request.user_id:
                return JsonResponse({'message': 'Email not verified'}, status=401)
        except jwt.ExpiredSignatureError:
            # Remove the expired token
            response = JsonResponse({'message': 'Token expired'}, status=401)
            response.delete_cookie('jwt')
            return response
        except jwt.InvalidTokenError:
            return JsonResponse({'message': 'Invalid token'}, status=401)

        return None
