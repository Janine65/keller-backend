import hashlib
import os
from functools import lru_cache

from dotenv import load_dotenv

load_dotenv()

APP_INFO = {
    "name": "keller-backend",
    "displayName": "Keller Organisator - Backend",
    "version": "2.0.4",
    "description": "Python + FastAPI + SQLAlchemy + Postgres API Server",
    "author": {"name": "Janine Franken", "email": "janine@olconet.com"},
    "license": "ISC",
}

JWT_EXPIRES_IN = 3600  # seconds, wie im alten Backend


class Settings:
    def __init__(self) -> None:
        self.node_env = os.getenv("NODE_ENV", "development")
        self.port = int(os.getenv("PORT", "3000"))
        self.secret_key = os.getenv("SECRET_KEY", "Keller Organisator")
        # kommasepariert; capacitor://localhost für die native iPhone-App
        self.origins = [
            o.strip()
            for o in os.getenv("ORIGIN", "http://localhost:4200").split(",")
            if o.strip()
        ] + ["capacitor://localhost"]
        self.credentials = os.getenv("CREDENTIALS", "true").lower() == "true"

        self.db_user = os.getenv("DB_USER", "postgres")
        self.db_database = os.getenv("DB_DATABASE", "keller")
        self.db_host = os.getenv("DB_HOST", "localhost")
        self.db_port = int(os.getenv("DB_PORT", "5436"))

        self.db_password = os.getenv("DB_PASSWORD", "")

        # HS256 verlangt >=32 Bytes (RFC 7518): Schlüssel aus dem
        # Secret ableiten
        self.jwt_key = hashlib.sha256(self.secret_key.encode()).digest()

    @property
    def database_url(self) -> str:
        return (
            f"postgresql+psycopg2://{self.db_user}:{self.db_password}"
            f"@{self.db_host}:{self.db_port}/{self.db_database}"
        )


@lru_cache
def get_settings() -> Settings:
    return Settings()
