export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN } = process.env;
export const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = process.env;

module.exports = {
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT,
  host: DB_HOST,
  dialect: 'postgres',
  migrationStorageTableName: 'sequelize_migrations',
  seederStorageTableName: 'sequelize_seeds',
  LOG_DIR: LOG_DIR
};
