from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class DocumentCreate(BaseModel):
    title: str
    content: Optional[str] = None


class DocumentResponse(BaseModel):
    id: int
    user_id: int  #  FIXED: Matches your 'user_id' database column name
    title: str
    content: Optional[str] = None
    file_path: Optional[str] = None  #  ADDED: Matches your new file_path feature
    created_at: datetime

    class Config:
        from_attributes = True
