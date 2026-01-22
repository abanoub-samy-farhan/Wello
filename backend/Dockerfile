FROM python:3.12.3

WORKDIR /app

COPY requirements.txt .
RUN pip install --upgrade pip \
 && pip install --no-cache-dir -r requirements.txt

COPY authentication authentication
COPY backend backend
COPY chatbot chatbot
COPY notifications notifications
COPY payment_methods payment_methods
COPY transactions transactions
COPY manage.py .

EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]