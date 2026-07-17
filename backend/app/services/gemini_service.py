import os
from google import genai
from dotenv import load_dotenv
import logging

logger = logging.getLogger(__name__)

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in .env file")

# 🛠️ FIX 1: Initialize the modern SDK client cleanly
client = genai.Client(api_key=GEMINI_API_KEY)
MODEL_NAME = "gemini-2.5-flash"


# 🛠️ FIX 2: Create a wrapper class so your existing chat_service.py 
# can still call `model.generate_content(prompt)` without crashing!
class GeminiModelWrapper:
    def generate_content(self, prompt: str):
        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=prompt,
        )
        return response

# Export the instance expected by your chat files
model = GeminiModelWrapper()


def summarize_text(text: str) -> str:
    logger.info("Generating document summary")
    """
    Generate a concise summary of document text using the modern Google GenAI library.
    """
    prompt = f"""
    You are an expert research assistant.

    Summarize the following document clearly.

    Requirements:
    - Keep important information
    - Use concise language
    - Use bullet points when helpful
    - Maximum 300 words

    DOCUMENT:

    {text}
    """

    # Use the modern client syntax for summarization
    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt
    )

    return response.text
