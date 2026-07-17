from sqlalchemy.orm import Session

from backend.app.services.gemini_service import model
from backend.app.services.vector_store import retrieve_relevant_chunk_from_db
from backend.app.services.memory_service import add_message, get_memory


def ask_document_question(
    document_id: int,
    user_id: int,
    question: str,
    db: Session
):

    # 🔍 Retrieve most relevant chunk
    context = retrieve_relevant_chunk_from_db(
        document_id=document_id,
        question=question,
        db=db
    )

    # 🧠 Load conversation memory
    memory = get_memory(
        db=db,
        user_id=user_id,
        document_id=document_id,
        limit=10
    )

    conversation_history = ""
    for msg in memory:
        conversation_history += f"{msg['role']}: {msg['content']}\n"

    # 🤖 Prompt for Gemini
    prompt = f"""
You are a smart AI assistant.

Use the document context if it is helpful.

If the context is incomplete or missing information,
you MUST use your general knowledge to give a complete, correct answer.

Do not say information is missing unless absolutely nothing is relevant.

Context:
{context}

Question:
{question}

Answer clearly and naturally.
"""

    response = model.generate_content(prompt)
    answer = response.text

    #  Save chat history
    add_message(
        db=db,
        user_id=user_id,
        document_id=document_id,
        role="user",
        content=question
    )

    add_message(
        db=db,
        user_id=user_id,
        document_id=document_id,
        role="assistant",
        content=answer
    )

    return answer