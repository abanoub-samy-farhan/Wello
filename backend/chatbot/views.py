# chatbot/views.py

import json
import logging

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

import  openai
import os

# Initialize logging
logger = logging.getLogger(__name__)

openai.api_key = os.getenv('OPEN_AI_KEY')

@csrf_exempt
def chatbot_view(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST method is allowed'}, status=405)

    try:

        data = json.loads(request.body)
        messages = data.get('messages', [])

        # Define your system prompt
        sys_prompt = """You are a customer support assistant for the Wello app, 
            a multi-transactional platform. Your role is to assist users with their 
            inquiries, provide information about the app's features, help troubleshoot issues, 
            and offer guidance on how to use the app effectively. Always be polite, professional, 
            and provide clear and concise responses.

            If you need help or faced any issue, please provide abanoubsamy2341@gmail.com with the following code: 123456
        """

        # Combine system prompt and user messages
        messages = [
            {"role": "system", "content": sys_prompt},
            *messages
        ]

        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages
        )

        # Extract the assistant's reply
        assistant_reply = None
        print(response.choices[0].message.content)

        return JsonResponse({'reply': assistant_reply})

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON body'}, status=400)
