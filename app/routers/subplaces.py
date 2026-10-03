from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Subplace
from app.routers.common import get_or_409
from app.schemas import CreateSubplaceDto
from app.security import get_current_user
from app.serializers import to_dict, to_dict_list

router = APIRouter(prefix="/basedata/subplaces", dependencies=[Depends(get_current_user)], tags=["subplaces"])


@router.get("")
def get_subplaces(db: Session = Depends(get_db)):
    return {"data": to_dict_list(list(db.scalars(select(Subplace)).all())), "message": "findAll"}


@router.put("/insert")
def insert_subplace(dto: CreateSubplaceDto, db: Session = Depends(get_db)):
    existing = db.scalar(select(Subplace).where(Subplace.name == dto.name, Subplace.placeid == dto.placeid))
    if existing:
        raise HTTPException(status_code=409, detail=f"This name {dto.name} already exists")
    subplace = Subplace(name=dto.name, placeid=dto.placeid, userid=dto.userid)
    db.add(subplace)
    db.commit()
    db.refresh(subplace)
    return {"data": to_dict(subplace), "message": "created"}


@router.post("/update")
def update_subplace(dto: CreateSubplaceDto, db: Session = Depends(get_db)):
    subplace = get_or_409(db, Subplace, dto.id, "subplace")
    subplace.name, subplace.placeid, subplace.userid = dto.name, dto.placeid, dto.userid
    db.commit()
    db.refresh(subplace)
    return {"data": to_dict(subplace), "message": "updated"}


@router.delete("/delete")
def delete_subplace(id: int, db: Session = Depends(get_db)):
    subplace = get_or_409(db, Subplace, id, "subplace")
    data = to_dict(subplace)
    db.delete(subplace)
    db.commit()
    return {"data": data, "message": "deleted"}
