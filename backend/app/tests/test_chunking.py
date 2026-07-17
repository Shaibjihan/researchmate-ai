from backend.app.services.chunking_service import chunk_text

sample = """
Python JavaScript HTML CSS
""" * 300

chunks = chunk_text(sample)

print("Chunks:", len(chunks))

for i, chunk in enumerate(chunks):
    print(f"Chunk {i+1}:")
    print(chunk[:100])