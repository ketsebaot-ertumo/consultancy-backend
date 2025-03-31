require('dotenv').config();
const { DATABASE_URL } = process.env;
const { URL } = require('url');

const dbUrl = new URL(DATABASE_URL);

module.exports = {
  development: {
    username: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.replace("/", ""),
    host: dbUrl.hostname,
    port: dbUrl.port,
    dialect: 'postgres',
  },
  test: {
    username: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.replace("/", ""),
    host: dbUrl.hostname,
    port: dbUrl.port,
    dialect: 'postgres',
  },
  production: {
    username: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.replace("/", ""),
    host: dbUrl.hostname,
    port: dbUrl.port,
    dialect: 'postgres',
  },
};
