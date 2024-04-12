import { AES, enc } from 'crypto-js'

class ConfigStruct {
  username: string;
  password: string;
  database: string;
  port: number;
  host: string;
  dialect: string;
  migrationStorageTableName: string;
  seederStorageTableName: string;
  log_dir: string;
  log_format: string;
  secret: string;
  webhost: string;
  node_port: number;
  credentials: boolean;
  node_env: string;

}

let finalConfig: ConfigStruct;

// module variables
if (process.env.CREDENTIALS !== 'true') {
  const config = require('./config.json');
  const defaultConfig = config.development;
  const environment = process.env.NODE_ENV || 'development';
  const environmentConfig = config[environment];

  finalConfig = {...defaultConfig, ...environmentConfig};

  //console.log(AES.encrypt('DimpgP-2024', finalConfig.secret).toString())

  finalConfig.password = AES.decrypt(finalConfig.password, finalConfig.secret).toString(enc.Utf8);
  finalConfig.dialect = 'postgres';
  finalConfig.migrationStorageTableName = 'sequelize_migrations';
  finalConfig.seederStorageTableName = 'sequelize_seeds';


} else {

  finalConfig = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT),
    host: process.env.DB_HOST,
    dialect: 'postgres',
    migrationStorageTableName: 'sequelize_migrations',
    seederStorageTableName: 'sequelize_seeds',
    log_dir: process.env.LOG_DIR,
    log_format: process.env.LOG_FORMAT,
    secret: process.env.SECRET_KEY,
    webhost: process.env.ORIGIN,
    node_port: Number(process.env.PORT),
    credentials: Boolean(process.env.CREDENTIALS),
    node_env: process.env.NODE_ENV
  }
}

// log global.gConfig
console.log(`Config: ${JSON.stringify(finalConfig, undefined)}`);
export = finalConfig;
