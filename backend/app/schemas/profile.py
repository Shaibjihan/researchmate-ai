from pydantic import BaseModel
from datetime import datetime


class ProfileResponse(BaseModel):
    id: int
    username: str
    email: str

    documents: int
    chat_history: int

    member_since: datetime

    class Config:
        from_attributes = True