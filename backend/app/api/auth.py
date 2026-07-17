from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm # Keep this import
from backend.app.database.database import get_db
from backend.app.models.user import User
from backend.app.schemas.user import UserCreate, UserLogin

from backend.app.core.security import hash_password, verify_password, create_access_token

router = APIRouter()

# REGISTER (POSTGRESQL) - Keeps working perfectly as-is
@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):

    # Check if email already exists
    existing_email = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if existing_email:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    # Check if username already exists
    existing_username = (
        db.query(User)
        .filter(User.username == user.username)
        .first()
    )

    if existing_username:
        raise HTTPException(
            status_code=400,
            detail="Username already taken"
        )

    hashed_pw = hash_password(user.password)

    new_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_pw,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully"
    }


# LOGIN (POSTGRESQL) - FIXED FOR SWAGGER UI
@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(), # Changed from 'user: UserLogin'
    db: Session = Depends(get_db)
):
    # Note: Swagger passes whatever you type into the 'username' box here.
    # We treat form_data.username as the user's email address.
    db_user = db.query(User).filter(User.email == form_data.username).first()

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    if not verify_password(form_data.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid password")

    token = create_access_token({"user_id": db_user.id})

    return {
        "access_token": token,
        "token_type": "bearer"
    }






