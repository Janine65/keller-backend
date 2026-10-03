# Keller Organisator – Python Backend

FastAPI-Port des TypeScript/Express-Backends. API-kompatibel (gleiche Pfade, gleiches Response-Format, gleiche JWT/Cookie-Auth) und nutzt das bestehende PostgreSQL-Schema unverändert.

## Setup

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # Werte anpassen
```

## Start

```bash
uvicorn app.main:app --port 3000 --reload
```

Swagger-UI: http://localhost:3000/api-docs

## Umgebungsvariablen

| Variable | Beschreibung | Default |
|---|---|---|
| `NODE_ENV` | development / production | development |
| `PORT` | Server-Port | 3000 |
| `ORIGIN` | CORS-Origin (Frontend-URL) | http://localhost:4200 |
| `CREDENTIALS` | CORS mit Cookies | true |
| `SECRET_KEY` | JWT-Secret (auch für AES-Passwort-Entschlüsselung) | Keller Organisator |
| `DB_USER` / `DB_PASSWORD` / `DB_DATABASE` / `DB_HOST` / `DB_PORT` | Postgres-Verbindung | postgres / – / keller / localhost / 5439 |

`DB_PASSWORD` darf wie bisher ein CryptoJS-AES-verschlüsselter String (`U2FsdGVkX1...`) sein.

## Docker

```bash
docker build -t keller-backend-python .
docker run --env-file .env -p 3000:3000 keller-backend-python
```
