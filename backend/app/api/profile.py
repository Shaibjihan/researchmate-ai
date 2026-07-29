from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.app.database.database import get_db
from backend.app.core.security import get_current_user

from backend.app.models.document import Document
from backend.app.models.chat_history import ChatHistory

from backend.app.schemas.profile import ProfileResponse

router = APIRouter()


@router.get("/", response_model=ProfileResponse)
def get_profile(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    document_count = (
        db.query(Document)
        .filter(Document.user_id == current_user.id)
        .count()
    )

    chat_count = (
        db.query(ChatHistory)
        .filter(ChatHistory.user_id == current_user.id)
        .count()
    )

    return {
        "id": current_user.id,
        "username": current_user.username,
        "email": current_user.email,
        "documents": document_count,
        "chat_history": chat_count,
        "member_since": current_user.created_at,
    }