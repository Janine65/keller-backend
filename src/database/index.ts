import Sequelize from 'sequelize';
import finalConfig = require('../config/sequelize-cli');
import { logger } from '@utils/logger';
import { initModels } from '@models/init-models';

const sequelize = new Sequelize.Sequelize(finalConfig.database, finalConfig.username, finalConfig.password, {
  dialect: 'postgres',
  host: finalConfig.host,
  port: finalConfig.port,
  timezone: 'Europe/Zurich',
  ssl: true,
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: false,
    freezeTableName: true,
    timestamps: true
  },
  pool: {
    min: 0,
    max: 5,
  },
  logQueryParameters: finalConfig.node_env === 'development',
  logging: (query, time) => {
    logger.info(time + 'ms' + ' ' + query);
  },
  benchmark: true,
});

sequelize.authenticate();
const dbModels = initModels(sequelize);

export const DB = {
  dbModels,
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};
