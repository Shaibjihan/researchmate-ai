from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import os

from backend.app.database.database import get_db
from backend.app.models.document import Document
from backend.app.models.document_chunk import DocumentChunk
from backend.app.models.chat_history import ChatHistory

from backend.app.schemas.document import DocumentCreate, DocumentResponse
from backend.app.core.security import get_current_user

router = APIRouter()


# 1. CREATE DOCUMENT (POST)
@router.post("/", response_model=DocumentResponse, status_code=status.HTTP_201_CREATED)
def create_document(
    doc: DocumentCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    try:
        new_doc = Document(
            title=doc.title,
            content=doc.content,
            file_path=None,
            user_id=current_user.id
        )

        db.add(new_doc)
        db.commit()
        db.refresh(new_doc)

        return new_doc

    except Exception as e:
        db.rollback()

        raise HTTPException(
            status_code=500,
            detail=f"Database write fault: {str(e)}"
        )


# 2. GET ALL DOCUMENTS
@router.get("/", response_model=list[DocumentResponse])
def get_documents(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    try:
        docs = (
            db.query(Document)
            .filter(Document.user_id == current_user.id)
            .all()
        )

        return docs

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Database query fault: {str(e)}"
        )


# 3. GET SINGLE DOCUMENT
@router.get("/{doc_id}", response_model=DocumentResponse)
def get_document(
    doc_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    try:
        doc = (
            db.query(Document)
            .filter(
                Document.id == doc_id,
                Document.user_id == current_user.id
            )
            .first()
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Database lookup fault: {str(e)}"
        )

    if not doc:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )

    return doc


# 4. UPDATE DOCUMENT
@router.put("/{doc_id}", response_model=DocumentResponse)
def update_document(
    doc_id: int,
    doc_data: DocumentCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    doc = (
        db.query(Document)
        .filter(
            Document.id == doc_id,
            Document.user_id == current_user.id
        )
        .first()
    )

    if not doc:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )

    try:
        doc.title = doc_data.title
        doc.content = doc_data.content

        db.commit()
        db.refresh(doc)

        return doc

    except Exception as e:
        db.rollback()

        raise HTTPException(
            status_code=500,
            detail=f"Database update fault: {str(e)}"
        )


# 5. DELETE DOCUMENT
@router.delete("/{doc_id}")
def delete_document(
    doc_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    doc = (
        db.query(Document)
        .filter(
            Document.id == doc_id,
            Document.user_id == current_user.id
        )
        .first()
    )

    if not doc:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )

    try:
        # Delete related chat history
        db.query(ChatHistory).filter(
            ChatHistory.document_id == doc.id
        ).delete()

        # Delete related document chunks
        db.query(DocumentChunk).filter(
            DocumentChunk.document_id == doc.id
        ).delete()

        # Delete physical PDF if it exists
        if doc.file_path and os.path.exists(doc.file_path):
            os.remove(doc.file_path)

        # Delete document
        db.delete(doc)

        db.commit()

        return {
            "message": "Document deleted successfully"
        }

    except Exception as e:
        db.rollback()

        raise HTTPException(
            status_code=500,
            detail=f"Delete failed: {str(e)}"
        )