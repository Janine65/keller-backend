from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User
from app.schemas import AuthenticateUserDto, CreateUserDto, RefreshTokenDto
from app.security import create_cookie, create_token, get_current_user, hash_password, verify_password
from app.serializers import to_dict

router = APIRouter(tags=["auth"])


@router.post("/signup", status_code=201)
def sign_up(user_data: CreateUserDto, db: Session = Depends(get_db)):
    existing = db.scalar(select(User).where(User.login == user_data.login))
    if existing:
        raise HTTPException(status_code=409, detail=f"This login {user_data.login} already exists")

    user = User(
        login=user_data.login,
        password=hash_password(user_data.password),
        name=user_data.name,
        email=user_data.email,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"data": to_dict(user), "message": "signup"}


@router.post("/login")
def log_in(user_data: AuthenticateUserDto, response: Response, db: Session = Depends(get_db)):
    user = db.scalar(select(User).where(User.login == user_data.login))
    if not user:
        raise HTTPException(status_code=409, detail=f"This login {user_data.login} was not found")
    if not verify_password(user_data.password, user.password):
        raise HTTPException(status_code=409, detail="Password is not matching")

    cookie = create_cookie(create_token(user.id))
    response.headers["Set-Cookie"] = cookie
    return {"data": to_dict(user), "cookie": cookie, "message": "login"}


@router.post("/refreshToken")
def refresh_token(user_data: RefreshTokenDto, response: Response, db: Session = Depends(get_db)):
    user = db.get(User, user_data.id)
    if not user:
        raise HTTPException(status_code=409, detail="user doesn't exist")

    cookie = create_cookie(create_token(user.id))
    response.headers["Set-Cookie"] = cookie
    return {"data": to_dict(user), "cookie": cookie, "message": "refresh"}


@router.post("/logout")
def log_out(response: Response, user: User = Depends(get_current_user)):
    response.headers["Set-Cookie"] = "Authorization=; Max-age=0"
    return {"data": to_dict(user), "message": "logout"}
