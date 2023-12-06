"use strict";
require("dotenv").config();

const env = "dev"; // 'dev' or 'prod'

const dev = {
  DB_CONFIG: {
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    HOST: process.env.DB_HOST,
    DATABASE: process.env.DATABASE,
    CONNECTION_LIMIT: process.env.DB_CONNECTION_LIMIT,
    PORT: process.env.DB_PORT
  },
  MONGO_URL:process.env.MONGO_URL
};

const config = { dev };
module.exports = config[env];
