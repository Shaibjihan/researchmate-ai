from backend.app.services.semantic_retrieval import (
    retrieve_relevant_chunk_semantic
)

document = """
Python Django Flask FastAPI Programming Development

SQL PostgreSQL MySQL Database Engineering

Machine Learning Deep Learning Neural Networks Artificial Intelligence

Football Cricket Basketball Sports
"""

question = "What technologies are related to intelligent systems?"

result = retrieve_relevant_chunk_semantic(
    document,
    question,
    chunk_size=4
)

print(result)