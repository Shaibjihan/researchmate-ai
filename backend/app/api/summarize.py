from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.app.database.database import get_db
from backend.app.models.document import Document
from backend.app.core.security import get_current_user
from backend.app.services.gemini_service import summarize_text

router = APIRouter()


@router.post("/{document_id}/summarize")
def summarize_document(
    document_id: int,
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
            detail="Document contains no text"
        )

    summary = summarize_text(document.content)

    return {
        "document_id": document.id,
        "title": document.title,
        "summary": summary
    }