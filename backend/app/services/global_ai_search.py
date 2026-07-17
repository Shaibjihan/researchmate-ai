from sqlalchemy.orm import Session
from backend.app.services.vector_store import retrieve_relevant_chunks_from_db
from backend.app.services.gemini_service import model

def global_search_answer(question: str, db: Session):
    # 🛡️ Wrap the entire database retrieval step in a try/except safety net
    try:
        chunks = retrieve_relevant_chunks_from_db(
            document_id=None,
            question=question,
            db=db,
            top_k=5
        )
    except Exception as e:
        # If any old database row is corrupted, log it silently and keep going with an empty library context
        print(f"[Database Warning]: Skipped broken vector row processing. Error: {e}")
        chunks = []

    # Safe fallback if no documents exist yet or if they fail to parse completely
    if not chunks:
        context = "No relevant documents found in the database database library."
    else:
        context = "\n\n".join(chunks)

    # 🤖 Robust expert prompt
    prompt = f"""
ROLE: You are an expert computer science assistant and research engine.

TASK: Answer the user's question accurately. 

REFERENCE CONTEXT FROM UPLOADED DOCUMENTS:
---
{context}
---

USER QUESTION: {question}

CRITICAL INSTRUCTIONS:
1. First, look at the REFERENCE CONTEXT above. If the context contains a clear, specific answer to the question, use it.
2. If the context does not explicitly define or fully answer the question (e.g., if the document just mentions the word but doesn't explain it), you MUST use your own advanced general knowledge to provide a comprehensive, perfect, and accurate definition.
3. Do NOT tell the user 'the provided context does not define it' or 'the context mentions...'. Just give the direct, correct answer to the question naturally.
"""

    try:
        response = model.generate_content(prompt)
        answer_text = response.text
    except Exception as e:
        answer_text = f"An error occurred while connecting to the Gemini API layer: {str(e)}"

    return {
        "answer": answer_text,
        "sources": chunks
    }
