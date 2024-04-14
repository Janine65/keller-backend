import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import finalConfig = require('../config/sequelize-cli')

let logDir: string = 'logs'
// logs dir
if (finalConfig && finalConfig.log_dir && finalConfig.log_dir != '')
  logDir = finalConfig.log_dir
logDir = join(__dirname, logDir);

if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

let logger = console;
let stream = process.stdout

export { logger, stream };
