from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from backend.app.database.database import engine, Base
from backend.app.core.security import get_current_user
from backend.app.core.exception_handler import register_exception_handlers

from backend.app.api.auth import router as auth_router
from backend.app.api.upload import router as upload_router
from backend.app.api.document import router as document_router
from backend.app.api.summarize import router as summarize_router
from backend.app.api.chat import router as chat_router
from backend.app.api.search import router as search_router















# Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ResearchMate AI",
    version="1.0.0"
)

# Register global exception handlers
register_exception_handlers(app)

# -----------------------------
# CORS CONFIGURATION
# -----------------------------
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# ROUTES
# -----------------------------
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(upload_router, prefix="/upload", tags=["Upload"])
app.include_router(document_router, prefix="/documents", tags=["Documents"])

app.include_router(
    summarize_router,
    prefix="/ai",
    tags=["AI"]
)

app.include_router(
    chat_router,
    prefix="/ai",
    tags=["AI Chat"]
)

app.include_router(
    search_router,
    prefix="/ai",
    tags=["Global Search"]
)

# -----------------------------
# TEST AUTH
# -----------------------------
@app.get("/test-auth")
def test_auth(current_user=Depends(get_current_user)):
    return {
        "id": current_user.id,
        "username": current_user.username,
        "email": current_user.email,
    }


@app.get("/")
def root():
    return {
        "status": "ok",
        "app": "ResearchMate AI"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }