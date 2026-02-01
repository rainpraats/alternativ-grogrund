import dotenv from 'dotenv';
dotenv.config();

const env = {
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES: process.env.JWT_EXPIRES,
  MONGO_URI: process.env.MONGO_URI,
  MONGO_DB_NAME: process.env.MONGO_DB_NAME,
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
} as const;

Object.values(env).forEach((value) => {
  if (!value) throw new Error('Missing environment variables');
  if (typeof value !== 'string')
    throw new Error('Environment variables must be strings');
});

const validatedEnv = env as Record<string, string>;

export const {
  JWT_SECRET,
  JWT_EXPIRES,
  MONGO_URI,
  MONGO_DB_NAME,
  PORT,
  NODE_ENV,
} = validatedEnv;
