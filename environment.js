import dotenv from 'dotenv';
dotenv.config();

export default {
  HOST_DB: process.env.HOST_DB,
  PORT: process.env.PORT,
  BASE_URL: process.env.BASE_URL,
  SECRET_KEY: process.env.SECRET_KEY,
  MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN,
  MAILGUN_API_KEY: process.env.MAILGUN_API_KEY,
};
