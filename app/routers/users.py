from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User
from app.security import get_current_user
from app.serializers import to_dict, to_dict_list

router = APIRouter(prefix="/users", tags=["users"])


@router.get("")
def get_users(db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    users = db.scalars(select(User)).all()
    return {"data": to_dict_list(list(users)), "message": "findAll"}


@router.get("/{user_id}")
def get_user_by_id(user_id: int, db: Session = Depends(get_db)):
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=409, detail="user doesn't exist")
    return {"data": to_dict(user), "message": "findOne"}
