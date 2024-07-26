import { config } from 'dotenv';

config();

export const DOMAIN = process.env.APP_DOMAIN;
export const DB = process.env.APP_DB
export const PORT = process.env.PORT ||process.env.APP_PORT;
export const SECRET = process.env.APP_SECRET;