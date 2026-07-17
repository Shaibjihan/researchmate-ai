import json

from sqlalchemy.orm import Session

from backend.app.models.document_chunk import (
    DocumentChunk
)

from backend.app.services.chunking_service import (
    chunk_text
)

from backend.app.services.embedding_service import (
    get_embedding
)


def store_document_chunks(
    document_id: int,
    document_text: str,
    db: Session,
    chunk_size: int = 150
):

    chunks = chunk_text(
        document_text,
        chunk_size
    )

    for chunk in chunks:

        embedding = get_embedding(
            chunk
        )

        db_chunk = DocumentChunk(
            document_id=document_id,
            chunk_text=chunk,
            embedding=json.dumps(embedding)
        )

        db.add(db_chunk)

    db.commit()