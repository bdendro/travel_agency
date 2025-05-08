import { Sequelize } from 'sequelize';
import Logger from '../utils/Logger/Logger.js';

const logger = new Logger();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOSTNAME,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
});

try {
  await sequelize.authenticate();
  logger.info('Connection has been established successfully.');
} catch (err) {
  logger.error({ err, msg: 'Database connection failed' });
  process.exit(1);
}

export default sequelize;
