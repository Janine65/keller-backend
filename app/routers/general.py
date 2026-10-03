from fastapi import APIRouter

from app.config import APP_INFO

router = APIRouter(tags=["general"])


@router.get("/about")
def about():
    return APP_INFO
