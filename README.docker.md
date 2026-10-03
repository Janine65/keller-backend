# Keller Organisator – Backend

FastAPI-Backend des Keller Organisators. Stellt die REST-API (JWT/Cookie-Auth) für das Frontend bereit und nutzt eine PostgreSQL-Datenbank.

## Image

```bash
docker pull janine65/keller-backend
```

## Schnellstart

```bash
docker run -d \
  --name keller-backend \
  -p 3000:3000 \
  -e SECRET_KEY="<jwt-secret>" \
  -e ORIGIN="https://keller.example.com" \
  -e DB_USER=postgres \
  -e DB_PASSWORD="<db-passwort>" \
  -e DB_DATABASE=keller \
  -e DB_HOST=<db-host> \
  -e DB_PORT=5432 \
  janine65/keller-backend
```

Alternativ mit Env-Datei: `docker run --env-file .env -p 3000:3000 janine65/keller-backend`

## Umgebungsvariablen

| Variable | Beschreibung | Default |
|---|---|---|
| `NODE_ENV` | development / production | development |
| `PORT` | Server-Port | 3000 |
| `ORIGIN` | Erlaubte CORS-Origins (kommagetrennt) | http://localhost:4200 |
| `CREDENTIALS` | CORS mit Cookies | true |
| `SECRET_KEY` | JWT-Secret (auch für AES-Passwort-Entschlüsselung) | – |
| `DB_USER` / `DB_PASSWORD` / `DB_DATABASE` / `DB_HOST` / `DB_PORT` | PostgreSQL-Verbindung | postgres / – / keller / localhost / 5439 |

`DB_PASSWORD` darf ein CryptoJS-AES-verschlüsselter String (`U2FsdGVkX1...`) sein.

## Endpunkte

- API: `http://<host>:3000/`
- Swagger-UI: `http://<host>:3000/api-docs`

## Quellcode

https://github.com/Janine65/keller-backend
