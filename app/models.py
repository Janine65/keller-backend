from datetime import datetime, date

from sqlalchemy import BigInteger, Boolean, Date, DateTime, ForeignKey, Integer, Numeric, Text, String, func
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass


class TimestampMixin:
    # Spaltennamen bleiben camelCase wie im bestehenden Sequelize-Schema
    createdAt: Mapped[datetime] = mapped_column("createdAt", DateTime, server_default=func.now(), nullable=False)
    updatedAt: Mapped[datetime] = mapped_column(
        "updatedAt", DateTime, server_default=func.now(), onupdate=func.now(), nullable=False
    )


class User(Base, TimestampMixin):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    login: Mapped[str] = mapped_column(Text, nullable=False)
    password: Mapped[str] = mapped_column(Text, nullable=False)
    name: Mapped[str] = mapped_column(Text, nullable=False)
    email: Mapped[str] = mapped_column(Text, nullable=False)
    userid: Mapped[int | None] = mapped_column(Integer, ForeignKey("users.id"), nullable=True)


class Placetype(Base, TimestampMixin):
    __tablename__ = "placetype"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(Text, nullable=False)
    icon: Mapped[str | None] = mapped_column(Text, nullable=True)
    userid: Mapped[int | None] = mapped_column(Integer, ForeignKey("users.id"), nullable=True)


class Place(Base, TimestampMixin):
    __tablename__ = "place"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(Text, nullable=False)
    placetypeid: Mapped[int] = mapped_column(Integer, ForeignKey("placetype.id"), nullable=False)
    userid: Mapped[int | None] = mapped_column(Integer, ForeignKey("users.id"), nullable=True)


class Subplace(Base, TimestampMixin):
    __tablename__ = "subplace"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(Text, nullable=False)
    placeid: Mapped[int] = mapped_column(Integer, ForeignKey("place.id"), nullable=False)
    userid: Mapped[int | None] = mapped_column(Integer, ForeignKey("users.id"), nullable=True)


class ThingColumnsMixin:
    name: Mapped[str] = mapped_column(Text, nullable=False)
    weight: Mapped[str] = mapped_column(Text, nullable=False)
    thing_type: Mapped[str] = mapped_column(Text, nullable=False)
    shop: Mapped[str | None] = mapped_column(Text, nullable=True)
    photo: Mapped[str | None] = mapped_column(String, nullable=True)
    levels: Mapped[list[int] | None] = mapped_column(ARRAY(Integer), nullable=True, default=lambda: [1, 3])
    userid: Mapped[int | None] = mapped_column(Integer, ForeignKey("users.id"), nullable=True)


class Thing(Base, ThingColumnsMixin, TimestampMixin):
    __tablename__ = "thing"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)


class Alcoholic(Base, ThingColumnsMixin, TimestampMixin):
    __tablename__ = "alcoholic"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    country: Mapped[str | None] = mapped_column(Text, nullable=True)
    region: Mapped[str | None] = mapped_column(Text, nullable=True)
    year: Mapped[int | None] = mapped_column(BigInteger, nullable=True)
    grapes: Mapped[list[str] | None] = mapped_column(ARRAY(Text), nullable=True)
    type: Mapped[str | None] = mapped_column(Text, nullable=True)


class Food(Base, ThingColumnsMixin, TimestampMixin):
    __tablename__ = "food"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    vacuumed: Mapped[bool | None] = mapped_column(Boolean, nullable=True, default=False)
    sealed: Mapped[bool | None] = mapped_column(Boolean, nullable=True, default=False)


class Nonalcoholic(Base, ThingColumnsMixin, TimestampMixin):
    __tablename__ = "nonalcoholic"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)


class Nonfood(Base, ThingColumnsMixin, TimestampMixin):
    __tablename__ = "nonfood"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)


class Object2Subplace(Base, TimestampMixin):
    __tablename__ = "object2subplace"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    subplaceid: Mapped[int] = mapped_column(Integer, ForeignKey("subplace.id"), nullable=False)
    alcoholicid: Mapped[int | None] = mapped_column(Integer, ForeignKey("alcoholic.id"), nullable=True)
    foodid: Mapped[int | None] = mapped_column(Integer, ForeignKey("food.id"), nullable=True)
    nonalcoholicid: Mapped[int | None] = mapped_column(Integer, ForeignKey("nonalcoholic.id"), nullable=True)
    nonfoodid: Mapped[int | None] = mapped_column(Integer, ForeignKey("nonfood.id"), nullable=True)
    weight: Mapped[float | None] = mapped_column(Numeric, nullable=True)
    count: Mapped[int | None] = mapped_column(Integer, nullable=True)
    userid: Mapped[int | None] = mapped_column(Integer, ForeignKey("users.id"), nullable=True)
    shopped_at: Mapped[date | None] = mapped_column(Date, nullable=True)
    valid_until: Mapped[date | None] = mapped_column(Date, nullable=True)
