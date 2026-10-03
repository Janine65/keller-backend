from typing import Any, Type

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models import Base


def get_or_409(db: Session, model: Type[Base], entity_id: int | None, name: str) -> Any:
    entity = db.get(model, entity_id) if entity_id is not None else None
    if not entity:
        raise HTTPException(status_code=409, detail=f"{name} doesn't exist")
    return entity
