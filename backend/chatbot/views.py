# chatbot/views.py

import json
import logging
import requests

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

import  openai
import os

# Initialize logging
logger = logging.getLogger(__name__)

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

        response = requests.post(
            url="https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {os.getenv('OPEN_AI_KEY')}",
                "Content-Type": "application/json"
            },
            data=json.dumps({
                "model": "openai/gpt-4o",
                "messages": messages
            })
        )

        # Extract the assistant's reply
        if (response.status_code == 200):
            assistant_reply = response.json()['choices'][0]['message']['content']
        else:
            logger.error(f"OpenRouter API error: {response.status_code} - {response.text}")
            assistant_reply = "I'm sorry, but I'm currently unable to process your request."

        return JsonResponse({'reply': assistant_reply})

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON body'}, status=400)
