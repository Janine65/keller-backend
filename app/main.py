import logging

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.config import APP_INFO, get_settings
from app.routers import auth, general, object2subplaces, places, placetypes, subplaces, things, users

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger("keller")

settings = get_settings()

app = FastAPI(
    title=APP_INFO["displayName"],
    version=APP_INFO["version"],
    docs_url="/api-docs",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins,
    allow_credentials=settings.credentials,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Fehlerformat wie im alten Backend: {"message": "..."}
@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    logger.error(f"[{request.method}] {request.url.path} >> StatusCode: {exc.status_code}, Message: {exc.detail}")
    return JSONResponse(status_code=exc.status_code, content={"message": str(exc.detail)})


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    message = ", ".join(f"{'.'.join(str(loc) for loc in e['loc'][1:])}: {e['msg']}" for e in exc.errors())
    logger.error(f"[{request.method}] {request.url.path} >> StatusCode: 400, Message: {message}")
    return JSONResponse(status_code=400, content={"message": message})


app.include_router(auth.router)
app.include_router(users.router)
app.include_router(general.router)
app.include_router(places.router)
app.include_router(placetypes.router)
app.include_router(subplaces.router)
app.include_router(object2subplaces.router)
app.include_router(things.router)
app.include_router(things.alcoholic_router)
app.include_router(things.food_router)
app.include_router(things.nonalcoholic_router)
app.include_router(things.nonfood_router)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app.main:app", host="0.0.0.0", port=settings.port, reload=settings.node_env == "development")
