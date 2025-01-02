import openai
import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Get the OpenAI API key from the .env file
openai.api_key = os.getenv('OPENAI_API_KEY')

# Function to extract channel, role, and specific from a problem description
def extract_info(problem_description):
    # Define the prompt to send to GPT for extracting details
    prompt = f"""
    Extract the following details from the problem description:
    - Channel: (e.g., academic-coding, leetcode, etc.)
    - Role: (e.g., helper, helped)
    - Specific: (e.g., Python, math, Essay, etc.)

    Problem Description: "{problem_description}"

    Provide your response as a JSON object with the keys: channel, role, and specific.
    """

    # Send the request to OpenAI API using GPT-3 or GPT-4 engine
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=100,
        n=1,
        stop=None,
        temperature=0.7,
    )

    # Extract the generated response text (which will be in JSON format)
    result = response.choices[0].text.strip()

    return result

# Example of Problem Description
problem_description = "I need help with academic coding, specifically in Python. I am a helper."

# Call the function to extract information
extracted_info = extract_info(problem_description)

# Output the extracted information
print("Extracted Information:", extracted_info)

