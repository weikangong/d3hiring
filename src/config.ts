import assert from 'assert';
import dotenv from 'dotenv';

// read in the .env file
dotenv.config();

// capture the environment variables the application needs
const {
  PORT,
  HOST,
  HOST_URL,
  COOKIE_ENCRYPT_PWD,
  SQL_PORT,
  SQL_HOST,
  SQL_USER,
  SQL_PASSWORD,
  SQL_DATABASE,
  SQL_SERVER,
  SQL_INIT,
  OKTA_ORG_URL,
  OKTA_CLIENT_ID,
  OKTA_CLIENT_SECRET,
} = process.env;

// validate the required configuration information
assert(PORT, 'PORT configuration is required.');
assert(HOST, 'HOST configuration is required.');
assert(HOST_URL, 'HOST_URL configuration is required.');
assert(COOKIE_ENCRYPT_PWD, 'COOKIE_ENCRYPT_PWD configuration is required.');

assert(SQL_PORT, 'SQL_PORT configuration is requred');
assert(SQL_HOST, 'SQL_PORT configuration is required');
assert(SQL_USER, 'SQL_USER configuration is required.');
assert(SQL_PASSWORD, 'SQL_PASSWORD configuration is required.');
assert(SQL_DATABASE, 'SQL_DATABASE configuration is required.');
assert(SQL_SERVER, 'SQL_SERVER configuration is required.');

assert(OKTA_ORG_URL, 'OKTA_ORG_URL configuration is required.');
assert(OKTA_CLIENT_ID, 'OKTA_CLIENT_ID configuration is required.');
assert(OKTA_CLIENT_SECRET, 'OKTA_CLIENT_SECRET configuration is required.');

export type SqlConfig = {
    port: number;
    host: string;
    username: string;
    password: string;
    database: string;
    server: string;
    init: boolean;
}

export type Config = {
    port: number;
    host: string;
    server: string;
    url: string;
    cookiePwd: string;
    sql: SqlConfig,
    okta: {
        url: string;
        clientId: string;
        clientSecret: string;
    },
}

// export the configuration information
export default {
  port: parseInt(PORT, 10),
  host: HOST,
  server: SQL_SERVER,
  url: HOST_URL,
  cookiePwd: COOKIE_ENCRYPT_PWD,
  sql: {
    port: parseInt(SQL_PORT, 10),
    host: SQL_HOST,
    username: SQL_USER,
    password: SQL_PASSWORD,
    database: SQL_DATABASE,
    server: SQL_SERVER,
    init: SQL_INIT === 'true',
  },
  okta: {
    url: OKTA_ORG_URL,
    clientId: OKTA_CLIENT_ID,
    clientSecret: OKTA_CLIENT_SECRET,
  },
};
