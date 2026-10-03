from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Place
from app.routers.common import get_or_409
from app.schemas import CreatePlaceDto
from app.security import get_current_user
from app.serializers import to_dict, to_dict_list

router = APIRouter(prefix="/basedata/places", dependencies=[Depends(get_current_user)], tags=["places"])


@router.get("")
def get_places(db: Session = Depends(get_db)):
    return {"data": to_dict_list(list(db.scalars(select(Place)).all())), "message": "findAll"}


@router.put("/insert")
def insert_place(dto: CreatePlaceDto, db: Session = Depends(get_db)):
    existing = db.scalar(select(Place).where(Place.name == dto.name, Place.placetypeid == dto.placetypeid))
    if existing:
        raise HTTPException(status_code=409, detail=f"This name {dto.name} already exists")
    place = Place(name=dto.name, placetypeid=dto.placetypeid, userid=dto.userid)
    db.add(place)
    db.commit()
    db.refresh(place)
    return {"data": to_dict(place), "message": "created"}


@router.post("/update")
def update_place(dto: CreatePlaceDto, db: Session = Depends(get_db)):
    place = get_or_409(db, Place, dto.id, "place")
    place.name, place.placetypeid, place.userid = dto.name, dto.placetypeid, dto.userid
    db.commit()
    db.refresh(place)
    return {"data": to_dict(place), "message": "updated"}


@router.delete("/delete")
def delete_place(id: int, db: Session = Depends(get_db)):
    place = get_or_409(db, Place, id, "place")
    data = to_dict(place)
    db.delete(place)
    db.commit()
    return {"data": data, "message": "deleted"}
