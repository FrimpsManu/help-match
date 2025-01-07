# Base code for a Django view that returns a JSON response with the selected AI model

from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
from django.views import View
from extract_infp import extract_info

# @csrf_exempt
class AISelect(View):
    """View to extract information from a help description using OpenAI API"""

    def post(self, request):
        """Accepts POST request with help description and returns extracted information"""
        help_description = request.POST.get("help-description", "")
        print(extract_info, help_description, sep='\n')
        # Mimic return value
        return JsonResponse({"extracted_info": "{'channel': 'continue-coding', 'role': 'hithere', 'specific': 'nohty'}"})
        # if not help_description:
        #     return JsonResponse({"error": "Help description not provided"}, status=400)
        # extracted_info = extract_info(help_description)
        # return JsonResponse({"extracted_info": extracted_info})

    def get(self, _):
        """Handles GET request method, by returning an error response"""
        return JsonResponse({"error": "Invalid request method"}, status=400)
