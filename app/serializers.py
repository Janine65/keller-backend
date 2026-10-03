from datetime import date, datetime
from decimal import Decimal
from typing import Any

from sqlalchemy import inspect

from app.models import Base


def to_dict(obj: Base | None) -> dict[str, Any] | None:
    """Serialisiert ein Model wie Sequelize: alle Spalten, Datumswerte als ISO-Strings."""
    if obj is None:
        return None
    result: dict[str, Any] = {}
    for column in inspect(obj).mapper.columns:
        value = getattr(obj, column.key)
        if isinstance(value, datetime):
            value = value.isoformat() + ("Z" if value.tzinfo is None else "")
        elif isinstance(value, date):
            value = value.isoformat()
        elif isinstance(value, Decimal):
            value = float(value)
        result[column.key] = value
    return result


def to_dict_list(objs: list[Base]) -> list[dict[str, Any]]:
    return [to_dict(o) for o in objs]
