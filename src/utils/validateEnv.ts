import { cleanEnv, port, str } from 'envalid';

export function ValidateEnv() {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    SECRET_KEY: str(),
    LOG_FORMAT: str(),
    LOG_DIR: str(),
    ORIGIN: str(),
    DB_USER: str(), 
    DB_PASSWORD: str(), 
    DB_HOST: str(), 
    DB_PORT: str(), 
    DB_DATABASE: str()
  });
}
