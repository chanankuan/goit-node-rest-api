import dotenv from 'dotenv';
dotenv.config();

export default {
  HOST_DB: process.env.HOST_DB,
  PORT: process.env.PORT,
  SECRET_KEY: process.env.SECRET_KEY,
};
