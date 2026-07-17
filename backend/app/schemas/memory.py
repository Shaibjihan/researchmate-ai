from pydantic import BaseModel


class MemoryMessage(BaseModel):
    role: str
    content: str