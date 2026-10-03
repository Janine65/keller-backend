from datetime import datetime, timedelta, timezone

import bcrypt
import jwt
from fastapi import Depends, HTTPException, Request
from sqlalchemy.orm import Session

from app.config import JWT_EXPIRES_IN, get_settings
from app.database import get_db
from app.models import User


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt(rounds=10)).decode()


def verify_password(password: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(password.encode(), hashed.encode())
    except ValueError:
        return False


def create_token(user_id: int) -> str:
    payload = {
        "id": user_id,
        "exp": datetime.now(timezone.utc) + timedelta(seconds=JWT_EXPIRES_IN),
    }
    return jwt.encode(payload, get_settings().jwt_key, algorithm="HS256")


def create_cookie(token: str) -> str:
    return f"Authorization={token}; HttpOnly; Max-Age={JWT_EXPIRES_IN};"


def _extract_token(request: Request) -> str | None:
    cookie_token = request.cookies.get("Authorization")
    if cookie_token:
        return cookie_token
    header = request.headers.get("Authorization")
    if header and "Bearer " in header:
        return header.split("Bearer ")[1]
    return None


def get_current_user(request: Request, db: Session = Depends(get_db)) -> User:
    token = _extract_token(request)
    if not token:
        raise HTTPException(status_code=404, detail="Authentication token missing")
    try:
        payload = jwt.decode(token, get_settings().jwt_key, algorithms=["HS256"])
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Wrong authentication token")
    user = db.get(User, payload.get("id"))
    if not user:
        raise HTTPException(status_code=401, detail="Wrong authentication token")
    return user
