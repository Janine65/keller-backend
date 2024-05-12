import 'reflect-metadata';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import finalConfig = require('./config/sequelize-cli')
import { ErrorMiddleware } from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import { DB } from './database';
import { ValidateEnv } from '@utils/validateEnv';
import { version } from '../package.json'

import authRouter from '@routes/auth.route';
import userRouter from '@routes/users.route';
import generalRouter from '@routes/general.route';
import kellerRouter from '@routes/keller.route';

ValidateEnv();

logger.info('environment variables:');
const confText = JSON.stringify(finalConfig);
logger.info(confText);
logger.info('');

const app: express.Application = express();
const env: string = finalConfig.node_env || 'development';
const port: string | number = finalConfig.node_port || 3000;

const options = {
  swaggerDefinition: {
    info: {
      title: 'Keller Application',
      version: '1.0.0',
      description: 'REST API documentation generated with swagger JSDoc',
    },
    basePath: '/',
    securityDefinitions: {
      bearerAuth: {
          type: 'apiKey',
          name: 'Authorization',
          scheme: 'bearer',
          in: 'header'
      }
  }
},
  apis: ['**/*route.ts'],
};

const specs = swaggerJSDoc(options);
app.use('/api-docs', function(req, res, next){
  specs["host"] = req.get('host');
  specs["info"]["version"] = version;
  req.swaggerDoc = specs;
  next();
}, swaggerUi.serve, swaggerUi.setup(specs));

DB.sequelize.sync({ force: false, logging: false });

app.use(morgan(finalConfig.log_format, { stream }));
app.use(cors({ origin: finalConfig.webhost, credentials: finalConfig.credentials }));
app.use(hpp());
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: [`'self'`],
      styleSrc: [`'self'`, `'unsafe-inline'`],
      imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
      scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
    },
  },
}));
app.use(compression());
app.use(express.json({ limit: 52428800 }));
app.use(express.urlencoded({ extended: true, limit: 52428800 }));
app.use(cookieParser());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers,Cookies,Access-Control-Allow-Methods,Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Authorization, Accept',
  );
  next();
});

app.use('/', authRouter);
app.use('/users/', userRouter);
app.use('/', generalRouter);
app.use('/basedata/', kellerRouter);

app.use(ErrorMiddleware);  

app.listen(port, () => {
  logger.info(`=================================`);
  logger.info(`======= ENV: ${env} =======`);
  logger.info(`🚀 App listening on the port ${port}`);
  logger.info(`=================================`);
});

