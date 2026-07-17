from backend.app.services.embedding_service import get_embedding

# 1. Compute the embedding array
embedding = get_embedding(
    "Python is a programming language."
)

# 2. Print output metadata to verify structure
print("Data Type:   ", type(embedding))
print("Vector Length:", len(embedding))  # Expecting 768 dimensions for text-embedding-004
print("First 10 Data Points:\n", embedding[:10])
