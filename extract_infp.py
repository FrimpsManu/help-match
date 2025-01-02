import time
import openai
import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Get the OpenAI API key from the .env file
openai.api_key = os.getenv('OPENAI_API_KEY')

# Function to extract channel, role, and specific from a problem description
def extract_info(problem_description):
    # prompt to send to GPT for extracting details
    prompt = f"""
    Extract the following details from the problem description:
    - Channel: (e.g., academic-coding, leetcode, etc.)
    - Role: (e.g., helper, helped)
    - Specific: (e.g., Python, math, Essay, etc.)

    Problem Description: "{problem_description}"

    Provide your response as a JSON object with the keys: channel, role, and specific.
    """

    # Send the request to OpenAI API using gpt-3.5-turbo engine
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # updated model
            messages=[{"role": "system", "content": "You are a helpful assistant."},
                      {"role": "user", "content": prompt}],
            max_tokens=100,
            temperature=0.7,
        )

        # Extract the generated response text
        result = response['choices'][0]['message']['content'].strip()

        return result
    
    except openai.error.RateLimitError:
        print("Rate limit exceeded, waiting for 60 seconds...")
        time.sleep(60)  # Wait for 60 seconds before retrying
        return extract_info(problem_description)  # Retry the function call

# Example of Problem Description
problem_description = "I need help with academic coding, specifically in Python. I am a helper."

# Call the function to extract information
extracted_info = extract_info(problem_description)

# Output the extracted information
print("Extracted Information:", extracted_info)
