import dotenv from 'dotenv';
dotenv.config();
export const DB_URL = process.env.DB_URL;
export const jsonSecret = process.env.jsonSecret;
