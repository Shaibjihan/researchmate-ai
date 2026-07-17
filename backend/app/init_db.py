from backend.app.database.database import Base, engine
from backend.app.models.user import User
from backend.app.models.document import Document

def init_db():
    print("Creating tables...")
    Base.metadata.create_all(bind=engine)
    print("Done!")

if __name__ == "__main__":
    init_db()