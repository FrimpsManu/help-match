"""Django view that returns a JSON response with the selected AI model"""

import json

from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
from django.views import View

from extract_infp import extract_info
from helper import log_ai_output

# @csrf_exempt
class AISelect(View):
    """View to extract information from a help description using OpenAI API"""

    def post(self, request):
        """Accepts POST request with help description and returns extracted information"""
        # Get the help description from the request body
        help_description = json.loads(request.body)
        # Mimic return value, for testing
        # return JsonResponse(
        # {"channel": "academic-math", "role": "Helper", "specific": "Calculus"})
        if not help_description:
            return JsonResponse({"error": "Help description not provided"}, status=400)
        extracted_info = extract_info(help_description)
        # Log the request and response from the AI
        #  should be useful for training dedicated non-LLM models
        #  (API-KEY is not free :) )
        log_ai_output(help_description, extracted_info)
        extracted_info = json.loads(extracted_info)
        return JsonResponse(extracted_info)

    def get(self, _):
        """Handles GET request method, by returning an error response"""
        return JsonResponse({"error": "Invalid request method"}, status=400)
