from sqlalchemy.orm import Session

from backend.app.models.chat_history import ChatHistory


def add_message(
    db: Session,
    user_id: int,
    document_id: int,
    role: str,
    content: str
):
    message = ChatHistory(
        user_id=user_id,
        document_id=document_id,
        role=role,
        content=content
    )

    db.add(message)
    db.commit()
    db.refresh(message)

    return message


def get_memory(
    db: Session,
    user_id: int,
    document_id: int,
    limit: int = 10
):

    messages = (
        db.query(ChatHistory)
        .filter(
            ChatHistory.user_id == user_id,
            ChatHistory.document_id == document_id
        )
        .order_by(ChatHistory.created_at.desc())
        .limit(limit)
        .all()
    )

    # reverse so oldest → newest
    messages.reverse()

    return [
        {
            "role": msg.role,
            "content": msg.content
        }
        for msg in messages
    ]