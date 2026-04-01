import app from './app';
import { config } from './config';
import { initDatabase } from './database';

const { sequelize } = initDatabase();

const start = async () => {
  await sequelize.authenticate();
  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
};

start();