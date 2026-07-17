from google import genai

# Initialize the client (Reads GEMINI_API_KEY automatically)
client = genai.Client()

def get_embedding(text: str) -> list[float]:
    """Generates a vector embedding using the correct response parsing structure."""
    response = client.models.embed_content(
        model="gemini-embedding-001",
        contents=text
    )
    
    # response.embeddings is a list. Extract the values array from the first item [0]
    return response.embeddings[0].values
