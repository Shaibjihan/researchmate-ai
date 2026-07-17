from backend.app.services.chunking_service import chunk_text


def retrieve_relevant_chunk(
    document_text: str,
    question: str,
    chunk_size: int = 500
):
    """
    Simple keyword-based retrieval.

    Splits document into chunks and finds
    the chunk with the most keyword matches.
    """

    chunks = chunk_text(document_text, chunk_size)

    question_words = set(
        word.lower()
        for word in question.split()
    )

    best_chunk = ""
    best_score = -1

    for chunk in chunks:

        chunk_words = set(
            word.lower()
            for word in chunk.split()
        )

        score = len(
            question_words.intersection(chunk_words)
        )

        if score > best_score:
            best_score = score
            best_chunk = chunk

    return best_chunk