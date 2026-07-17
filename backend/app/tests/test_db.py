import sys
import os

sys.path.append(os.path.abspath(os.path.dirname(__file__)))

# Import your Base and Engine, and import your models to load them
from backend.app.database.database import Base, engine
from backend.app.models import user , document  # This forces Python to look at your User table structure

print(" Creating tables inside 'researchmate' database...")

try:
    # This line reads your models and draws the tables in PostgreSQL
    Base.metadata.create_all(bind=engine)
    print(" SUCCESS: Tables created perfectly!")
except Exception as e:
    print(f" Error creating tables: {e}")

