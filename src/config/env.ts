import dotenv from 'dotenv';

dotenv.config();

const nodeEnv = process.env.NODE_ENV || 'development';
const dbUrl = nodeEnv === 'development' ? undefined : process.env.DATABASE_URL;

if (dbUrl) {
  const url = new URL(dbUrl);
  process.env.DB_HOST = url.hostname;
  process.env.DB_PORT = url.port || '5432';
  process.env.DB_NAME = url.pathname.replace('/', '');
  process.env.DB_USER = url.username;
  process.env.DB_PASSWORD = url.password;
  process.env.DB_SSL = nodeEnv === 'development' ? (process.env.DB_SSL || 'false') : 'true';
}

const required = ['JWT_SECRET'];
if (nodeEnv === 'development') {
  required.push('DB_HOST', 'DB_PORT', 'DB_NAME', 'DB_USER', 'DB_PASSWORD');
}

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required env var: ${key}`);
  }
}

export const env = {
  nodeEnv,
  port: Number(process.env.PORT || 4000),
  db: {
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT || 5432),
    name: process.env.DB_NAME as string,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    ssl: process.env.DB_SSL === 'true',
  },
  jwt: {
    secret: process.env.JWT_SECRET as string,
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
};
