from datetime import date
from typing import Any

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class CreateUserDto(BaseModel):
    model_config = ConfigDict(extra="forbid")
    login: str = Field(min_length=1)
    password: str = Field(min_length=8, max_length=32)
    email: EmailStr
    name: str = Field(min_length=1)


class AuthenticateUserDto(BaseModel):
    login: str = Field(min_length=1)
    password: str = Field(min_length=8, max_length=32)


class RefreshTokenDto(BaseModel):
    model_config = ConfigDict(extra="allow")
    id: int
    login: str | None = None


class CreatePlaceDto(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: int | None = None
    name: str = Field(min_length=1)
    placetypeid: int
    userid: int | None = None


class CreatePlacetypeDto(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: int | None = None
    name: str = Field(min_length=1)
    icon: str | None = None
    userid: int | None = None


class CreateSubplaceDto(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: int | None = None
    name: str = Field(min_length=1)
    placeid: int
    userid: int | None = None


class ThingBaseDto(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: int | None = None
    name: str = Field(min_length=1)
    weight: str = Field(min_length=1)
    shop: str | None = None
    photo: str | None = None
    levels: list[int] | None = None
    userid: int | None = None


class CreateAlcoholicDto(ThingBaseDto):
    country: str | None = None
    region: str | None = None
    year: int | None = None
    grapes: list[str] | None = None
    type: str | None = None


class CreateFoodDto(ThingBaseDto):
    vacuumed: bool | None = None
    sealed: bool | None = None


class CreateNonalcoholicDto(ThingBaseDto):
    pass


class CreateNonfoodDto(ThingBaseDto):
    pass


class Object2SubplaceDto(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: int | None = None
    subplaceid: int
    alcoholicid: int | None = None
    foodid: int | None = None
    nonalcoholicid: int | None = None
    nonfoodid: int | None = None
    weight: float | None = None
    count: int | None = None
    userid: int | None = None
    shopped_at: date | None = None
    valid_until: date | None = None

    def db_values(self) -> dict[str, Any]:
        return self.model_dump(exclude={"id"}, exclude_unset=True)
