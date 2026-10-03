from typing import Any, Type

from fastapi import APIRouter, Body, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Alcoholic, Base, Food, Nonalcoholic, Nonfood, Object2Subplace, Thing
from app.routers.common import get_or_409
from app.schemas import (
    CreateAlcoholicDto,
    CreateFoodDto,
    CreateNonalcoholicDto,
    CreateNonfoodDto,
    Object2SubplaceDto,
    ThingBaseDto,
)
from app.security import get_current_user
from app.serializers import to_dict, to_dict_list

router = APIRouter(prefix="/basedata/things", dependencies=[Depends(get_current_user)], tags=["things"])


@router.get("")
def get_things(db: Session = Depends(get_db)):
    return {"data": to_dict_list(list(db.scalars(select(Thing)).all())), "message": "findAll"}


THING_CONFIG: dict[str, tuple[Type[Base], Type[ThingBaseDto], str]] = {
    "alcoholic": (Alcoholic, CreateAlcoholicDto, "alcoholicid"),
    "food": (Food, CreateFoodDto, "foodid"),
    "nonalcoholic": (Nonalcoholic, CreateNonalcoholicDto, "nonalcoholicid"),
    "nonfood": (Nonfood, CreateNonfoodDto, "nonfoodid"),
}


def build_thing_router(thing_type: str) -> APIRouter:
    """Erzeugt die CRUD- und Relations-Routen für einen Thing-Typ."""
    model, dto_class, fk_field = THING_CONFIG[thing_type]
    thing_router = APIRouter(
        prefix=f"/basedata/things/{thing_type}",
        dependencies=[Depends(get_current_user)],
        tags=[f"thing {thing_type}"],
    )

    @thing_router.get("", name=f"get_{thing_type}s")
    def get_all(db: Session = Depends(get_db)):
        return {"data": to_dict_list(list(db.scalars(select(model)).all())), "message": "findAll"}

    @thing_router.get("/id", name=f"get_{thing_type}_by_id")
    def get_by_id(id: int, db: Session = Depends(get_db)):
        entity = get_or_409(db, model, id, thing_type)
        return {"data": to_dict(entity), "message": "findByKey"}

    @thing_router.put("/insert", name=f"insert_{thing_type}")
    def insert(dto: dto_class, db: Session = Depends(get_db)):  # type: ignore[valid-type]
        existing = db.scalar(select(model).where(model.name == dto.name))
        if existing:
            raise HTTPException(status_code=409, detail=f"This name {dto.name} already exists")
        values = dto.model_dump(exclude={"id"}, exclude_unset=True)
        entity = model(**values, thing_type=thing_type)
        db.add(entity)
        db.commit()
        db.refresh(entity)
        return {"data": to_dict(entity), "message": "created"}

    @thing_router.post("/update", name=f"update_{thing_type}")
    def update(dto: dto_class, db: Session = Depends(get_db)):  # type: ignore[valid-type]
        entity = get_or_409(db, model, dto.id, thing_type)
        for key, value in dto.model_dump(exclude={"id"}, exclude_unset=True).items():
            setattr(entity, key, value)
        db.commit()
        db.refresh(entity)
        return {"data": to_dict(entity), "message": "updated"}

    @thing_router.delete("/delete", name=f"delete_{thing_type}")
    def delete(id: int, db: Session = Depends(get_db)):
        entity = get_or_409(db, model, id, thing_type)
        data = to_dict(entity)
        db.delete(entity)
        db.commit()
        return {"data": data, "message": "deleted"}

    @thing_router.get("/subplaces", name=f"get_{thing_type}2subplaces")
    def get_relations(id: int, db: Session = Depends(get_db)):
        get_or_409(db, model, id, thing_type)
        relations = db.scalars(
            select(Object2Subplace).where(getattr(Object2Subplace, fk_field) == id)
        ).all()
        return {"data": to_dict_list(list(relations)), "message": "findAll"}

    @thing_router.put("/subplaces/insert", name=f"insert_{thing_type}2subplace")
    def insert_relation(
        obj2sub: Object2SubplaceDto = Body(alias="obj2sub"),
        thing: dict[str, Any] = Body(alias=thing_type, default={}),
        db: Session = Depends(get_db),
    ):
        values = obj2sub.db_values()
        thing_id = thing.get("id") or values.get(fk_field)
        if thing_id:
            get_or_409(db, model, thing_id, thing_type)
            values[fk_field] = thing_id
        relation = Object2Subplace(**values)
        db.add(relation)
        db.commit()
        db.refresh(relation)
        return {"data": to_dict(relation), "message": "created"}

    return thing_router


alcoholic_router = build_thing_router("alcoholic")
food_router = build_thing_router("food")
nonalcoholic_router = build_thing_router("nonalcoholic")
nonfood_router = build_thing_router("nonfood")
