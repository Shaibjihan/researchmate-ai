import json
import numpy as np

from sqlalchemy.orm import Session

from backend.app.models.document_chunk import (
    DocumentChunk
)

from backend.app.services.embedding_service import (
    get_embedding
)


def cosine_similarity(vec1, vec2):

    vec1 = np.array(vec1)
    vec2 = np.array(vec2)

    return np.dot(vec1, vec2) / (
        np.linalg.norm(vec1)
        * np.linalg.norm(vec2)
    )


def retrieve_chunks_across_documents(
    question: str,
    db: Session,
    top_k: int = 3
):

    question_embedding = get_embedding(
        question
    )

    chunks = db.query(
        DocumentChunk
    ).all()

    scored_chunks = []

    for chunk in chunks:

        embedding = json.loads(
            chunk.embedding
        )

        score = cosine_similarity(
            question_embedding,
            embedding
        )

        scored_chunks.append(
            (score, chunk.chunk_text)
        )

    scored_chunks.sort(
        reverse=True,
        key=lambda x: x[0]
    )

    best_chunks = [
        chunk_text
        for _, chunk_text
        in scored_chunks[:top_k]
    ]

    return "\n\n".join(best_chunks)