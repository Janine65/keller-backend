import base64
import hashlib
import os
from functools import lru_cache

from dotenv import load_dotenv

load_dotenv()

APP_INFO = {
    "name": "keller-backend",
    "displayName": "Keller Organisator - Backend",
    "version": "2.0.3",
    "description": "Python + FastAPI + SQLAlchemy + Postgres API Server",
    "author": {"name": "Janine Franken", "email": "janine@olconet.com"},
    "license": "ISC",
}

JWT_EXPIRES_IN = 3600  # seconds, wie im alten Backend


def _decrypt_cryptojs(ciphertext_b64: str, passphrase: str) -> str:
    """Entschlüsselt CryptoJS.AES-Strings (OpenSSL-Salted-Format, EVP_BytesToKey/MD5)."""
    from Crypto.Cipher import AES
    from Crypto.Hash import MD5

    data = base64.b64decode(ciphertext_b64)
    assert data[:8] == b"Salted__", "unexpected ciphertext format"
    salt, ct = data[8:16], data[16:]
    key_iv = b""
    prev = b""
    while len(key_iv) < 48:
        prev = MD5.new(prev + passphrase.encode() + salt).digest()
        key_iv += prev
    key, iv = key_iv[:32], key_iv[32:48]
    pt = AES.new(key, AES.MODE_CBC, iv).decrypt(ct)
    return pt[: -pt[-1]].decode()


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

        password = os.getenv("DB_PASSWORD", "")
        if password.startswith("U2FsdGVkX1"):
            password = _decrypt_cryptojs(password, self.secret_key)
        self.db_password = password

        # HS256 verlangt >=32 Bytes (RFC 7518): Schlüssel aus dem Secret ableiten
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
