from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Placetype
from app.routers.common import get_or_409
from app.schemas import CreatePlacetypeDto
from app.security import get_current_user
from app.serializers import to_dict, to_dict_list

router = APIRouter(prefix="/basedata/placetypes", dependencies=[Depends(get_current_user)], tags=["placetypes"])


@router.get("")
def get_placetypes(db: Session = Depends(get_db)):
    return {"data": to_dict_list(list(db.scalars(select(Placetype)).all())), "message": "findAll"}


@router.put("/insert")
def insert_placetype(dto: CreatePlacetypeDto, db: Session = Depends(get_db)):
    existing = db.scalar(select(Placetype).where(Placetype.name == dto.name))
    if existing:
        raise HTTPException(status_code=409, detail=f"This name {dto.name} already exists")
    placetype = Placetype(name=dto.name, icon=dto.icon, userid=dto.userid)
    db.add(placetype)
    db.commit()
    db.refresh(placetype)
    return {"data": to_dict(placetype), "message": "created"}


@router.post("/update")
def update_placetype(dto: CreatePlacetypeDto, db: Session = Depends(get_db)):
    placetype = get_or_409(db, Placetype, dto.id, "placetype")
    placetype.name, placetype.icon, placetype.userid = dto.name, dto.icon, dto.userid
    db.commit()
    db.refresh(placetype)
    return {"data": to_dict(placetype), "message": "updated"}


@router.delete("/delete")
def delete_placetype(id: int, db: Session = Depends(get_db)):
    placetype = get_or_409(db, Placetype, id, "placetype")
    data = to_dict(placetype)
    db.delete(placetype)
    db.commit()
    return {"data": data, "message": "deleted"}
