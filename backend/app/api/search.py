from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.app.database.database import get_db
from backend.app.core.security import get_current_user
from backend.app.schemas.chat import ChatRequest, ChatResponse

#  FIX 1: Point to your actual service file and processing function
from backend.app.services.global_ai_search import global_search_answer

router = APIRouter()

@router.post(
    "/search",
    response_model=ChatResponse
)
def search_all_documents(
    chat: ChatRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    """
    Performs a semantic search across all document chunks and utilizes 
    Gemini with fallback knowledge capabilities.
    """
    #  FIX 2: Delegate retrieval, context building, and prompt execution to your service
    result = global_search_answer(
        question=chat.question,
        db=db
    )

    #  FIX 3: Return the structured response expected by ChatResponse schema
    return ChatResponse(
        answer=result["answer"]
    )
