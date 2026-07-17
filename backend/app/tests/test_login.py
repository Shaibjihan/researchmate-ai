from backend.app.core.auth import login_user

result = login_user("test@example.com", "123456")
print(result)