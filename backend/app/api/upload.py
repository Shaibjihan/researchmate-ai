


from fastapi import (
    APIRouter,
    UploadFile,
    File,
    HTTPException,
    Depends,
)
from fastapi.responses import FileResponse

import os
import shutil
import PyPDF2
from sqlalchemy.orm import Session

from backend.app.services.pdf_service import extract_text_from_pdf
from backend.app.services.embedding_storage import (
    store_document_chunks
)
from backend.app.database.database import get_db
from backend.app.models.document import Document
from backend.app.core.security import get_current_user

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/")
async def upload_file(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: Document = Depends(get_current_user)  # Now holds the complete User object safely
):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    # 1. Save file locally
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to write file to disk: {str(e)}")

    # 2. Extract text content
    text = ""
    if file.filename.endswith(".pdf"):
        try:
            text = extract_text_from_pdf(file_path)
        except Exception as e:
            text = f"Text extraction omitted: {str(e)}"

    # 3. Save metadata row into PostgreSQL database
    try:
        new_doc = Document(
            title=file.filename,
            content=text,
            file_path=file_path,
            user_id=current_user.id         #  Accesses the ID property on the complete User object safely
        )

        db.add(new_doc)
        db.commit()                         # Writes the transaction permanently to PostgreSQL
        db.refresh(new_doc)

        store_document_chunks(
        document_id=new_doc.id,
        document_text=text,
        db=db
        )


        
        return {
            "document_id": new_doc.id,
            "filename": file.filename,
            "text_length": len(text),
            "status": "Success! Saved to folder and database"
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database runtime fault: {str(e)}")



#  --------------Download-----------

@router.get("/download/{document_id}")
def download_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
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

    if not os.path.exists(document.file_path):
        raise HTTPException(
            status_code=404,
            detail="File not found on server"
        )

    return FileResponse(
        path=document.file_path,
        filename=document.title,
        media_type="application/pdf"
    )







