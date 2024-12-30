from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import status
from .serializers import UserSerializer
from .models import User
from .models import UserSession, Verification_Token
from notifications.utils import EmailRouter
from decouple import config
import jwt, datetime
import pyotp


class RegisterView(APIView):
    def post(self, request):

        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            email_router = EmailRouter(config('EMAIL_HOST'), config('EMAIL_PORT'), config('EMAIL_USERNAME'), config('EMAIL_PASSWORD'))
            email_router.send_verification_link(serializer.data['email'])
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')

        payload = {
            'id': str(user.id),
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=8),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, config('JWT_SECRET'), algorithm='HS256')
        new_session = UserSession(
            user_id=user,
            jwt_token=token,
            expriy_at=datetime.datetime.utcnow() + datetime.timedelta(seconds=60)
        )
        new_session.save()

        response = Response()
        response.set_cookie(
            key='jwt',
            value=token,
            httponly=True,
            max_age=60 * 60,
            path='/',
        )
        response.data = {
            'jwt': token
        }

        serializer = UserSerializer(user)
        response.data['user'] = serializer.data
        return response


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        user_id = request.user_id
        user_sessions = UserSession.objects.filter(user_id=user_id)
        for session in user_sessions:
            session.delete()
        return response
    
class UserGetAll(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

class UserCreate(APIView):
    def post(self, request):
        print(request.data)
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UserGetById(APIView):
    def get(self, request, id):
        if not id:
            return Response(status=status.HTTP_403_FORBIDDEN)
        user = User.objects.get(id=id)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
class UserCRUD(APIView):
    def get(self, request):
        user_id = request.user_id
        if not user_id:
            return Response(status=status.HTTP_403_FORBIDDEN)
        user = User.objects.get(id=user_id)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request):
        user_id = request.user_id
        user = User.objects.get(id=user_id)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request):
        user_id = request.user_id
        if not user_id:
            return Response(status=status.HTTP_403_FORBIDDEN)
        user = User.objects.get(id=id)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class VerifyEmail(APIView):
    def post(self, request):
        email = request.data['email']
        token = request.data['token']
        try:
            verification_token = Verification_Token.objects.get(email=email)
            if verification_token.token == token:
                user = User.objects.get(email=email)
                user.is_verified = True
                user.save()
                verification_token.delete()
                return Response(status=status.HTTP_200_OK)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        except Verification_Token.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        

class IsSignedIn(APIView):
    def get(self, request):
        return Response(status=status.HTTP_200_OK)