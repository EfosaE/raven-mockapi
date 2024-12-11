// Update with your config settings and using commonJS module

const dotenv = require('dotenv');

dotenv.config();

console.log(process.env.DATABASE_URL);

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const development = {
  client: 'mysql2', // or 'pg' for PostgreSQL
  connection: process.env.DATABASE_URL,
  migrations: {
    directory: './knex/migrations',
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: './knex/seeds',
  },
};


const production = {
  client: 'mysql2', // or 'pg' for PostgreSQL
  connection: process.env.DATABASE_URL,
  migrations: {
    directory: './knex/migrations',
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: './knex/seeds',
  },
};

module.exports = {
  development,
  // staging,
  production,
};
