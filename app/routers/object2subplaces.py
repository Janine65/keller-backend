from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Object2Subplace
from app.routers.common import get_or_409
from app.schemas import Object2SubplaceDto
from app.security import get_current_user
from app.serializers import to_dict, to_dict_list

router = APIRouter(
    prefix="/basedata/things/subplaces", dependencies=[Depends(get_current_user)], tags=["thing-subplace relations"]
)


@router.get("")
def get_all_object2subplaces(db: Session = Depends(get_db)):
    return {"data": to_dict_list(list(db.scalars(select(Object2Subplace)).all())), "message": "findAll"}


@router.put("/insert")
def insert_object2subplace(dto: Object2SubplaceDto, db: Session = Depends(get_db)):
    relation = Object2Subplace(**dto.db_values())
    db.add(relation)
    db.commit()
    db.refresh(relation)
    return {"data": to_dict(relation), "message": "created"}


@router.post("/update")
def update_object2subplace(dto: Object2SubplaceDto, db: Session = Depends(get_db)):
    relation = get_or_409(db, Object2Subplace, dto.id, "object2subject")
    for key, value in dto.db_values().items():
        setattr(relation, key, value)
    db.commit()
    db.refresh(relation)
    return {"data": to_dict(relation), "message": "update"}


@router.delete("/delete")
def delete_object2subplace(id: int, db: Session = Depends(get_db)):
    relation = get_or_409(db, Object2Subplace, id, "object2subject")
    db.delete(relation)
    db.commit()
    return {"data": True, "message": "update"}
