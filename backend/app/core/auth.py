from backend.app.core.security import verify_password, create_access_token

fake_user_db = {
    "test@example.com": {
        "email": "test@example.com",
        "password": "$2b$12$JdzCMGRBgyXEdmbaKrN11uGHQkctfnfkur716n9iOkeYwDIYB.2x2"
    }
}


def login_user(username: str, password: str):
    # Swagger sends "username", so we use that as email
    user = fake_user_db.get(username)

    if not user:
        return {"error": "User not found"}

    if not verify_password(password, user["password"]):
        return {"error": "Invalid password"}

    token = create_access_token({"user_id": user["email"]})

    return {
        "access_token": token,
        "token_type": "bearer"
    }