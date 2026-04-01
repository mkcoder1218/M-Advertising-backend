import { Sequelize } from 'sequelize';

const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_SSL,
} = process.env;

export const sequelize = new Sequelize(DB_NAME || '', DB_USER || '', DB_PASSWORD || '', {
  host: DB_HOST || 'localhost',
  port: DB_PORT ? Number(DB_PORT) : 5432,
  dialect: 'postgres',
  logging: false,
  dialectOptions: DB_SSL === 'true' ? { ssl: { require: true, rejectUnauthorized: false } } : undefined,
  define: {
    underscored: true,
    timestamps: true,
  },
});