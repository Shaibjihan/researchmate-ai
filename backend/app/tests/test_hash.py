from backend.app.core.security import (
    hash_password,
    verify_password
)

password = "jihan123"

hashed = hash_password(password)

print("Hashed:", hashed)

print(
    verify_password(
        password,
        hashed
    )
)