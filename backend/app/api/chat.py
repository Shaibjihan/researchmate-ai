from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.app.database.database import get_db
from backend.app.models.document import Document
from backend.app.models.chat_history import ChatHistory
from backend.app.core.security import get_current_user

from backend.app.schemas.chat import (
    ChatRequest,
    ChatResponse
)

from backend.app.services.chat_service import (
    ask_document_question
)

router = APIRouter()


@router.post(
    "/{document_id}/chat",
    response_model=ChatResponse
)
def chat_with_document(
    document_id: int,
    chat: ChatRequest,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    document = (
        db.query(Document)
        .filter(
            Document.id == document_id,
            Document.user_id == current_user.id
        )
        .first()
    )

    if not document:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )

    if not document.content:
        raise HTTPException(
            status_code=400,
            detail="Document has no text content"
        )

    answer = ask_document_question(
        document_id=document.id,
        user_id=current_user.id,
        question=chat.question,
        db=db
    )

    return ChatResponse(answer=answer)

@router.get("/{document_id}/history")
def get_chat_history(
    document_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    history = (
        db.query(ChatHistory)
        .filter(
            ChatHistory.document_id == document_id,
            ChatHistory.user_id == current_user.id,
        )
        .order_by(ChatHistory.created_at.asc())
        .all()
    )

    return history