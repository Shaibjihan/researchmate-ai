import json
import numpy as np
from sqlalchemy.orm import Session
from backend.app.models.document_chunk import DocumentChunk
from backend.app.services.embedding_service import get_embedding

def cosine_similarity(vec1, vec2):
    vec1 = np.array(vec1)
    vec2 = np.array(vec2)
    if np.linalg.norm(vec1) == 0 or np.linalg.norm(vec2) == 0:
        return 0.0
    return float(np.dot(vec1, vec2) / (np.linalg.norm(vec1) * np.linalg.norm(vec2)))


# 🎯 1. SINGLE DOCUMENT RETRIEVAL (Used by chat_service.py)
def retrieve_relevant_chunk_from_db(document_id: int, question: str, db: Session):
    question_embedding = get_embedding(question)
    chunks = db.query(DocumentChunk).filter(DocumentChunk.document_id == document_id).all()

    best_chunk = ""
    best_score = -1

    for chunk in chunks:
        if not chunk.embedding:
            continue
        try:
            embedding = json.loads(chunk.embedding) if isinstance(chunk.embedding, str) else chunk.embedding
        except Exception:
            continue
        
        score = cosine_similarity(question_embedding, embedding)
        if score > best_score:
            best_score = score
            best_chunk = chunk.chunk_text

    return best_chunk


# 🌐 2. MULTI-DOCUMENT GLOBAL RETRIEVAL (FIXED FOR STABILITY)
def retrieve_relevant_chunks_from_db(document_id: int | None, question: str, db: Session, top_k: int = 5) -> list[str]:
    """Retrieves top_k relevant chunk strings safely across the database."""
    try:
        question_embedding = get_embedding(question)
    except Exception:
        return [] # Return empty if embedding generation fails

    query = db.query(DocumentChunk)
    if document_id is not None:
        query = query.filter(DocumentChunk.document_id == document_id)
        
    all_chunks = query.all()
    if not all_chunks:
        return []

    scored_chunks = []
    for chunk in all_chunks:
        if not chunk.embedding:
            continue
        try:
            embedding = json.loads(chunk.embedding) if isinstance(chunk.embedding, str) else chunk.embedding
            score = cosine_similarity(question_embedding, embedding)
            scored_chunks.append((score, chunk.chunk_text))
        except Exception:
            continue
        
    if not scored_chunks:
        return []

    # 🛠️ FIX: Sort explicitly by the numerical score index [0] to prevent string comparison crashes
    scored_chunks.sort(key=lambda x: x[0], reverse=True)
    
    return [text for score, text in scored_chunks[:top_k]]
