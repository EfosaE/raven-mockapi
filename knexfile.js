// Update with your config settings and using commonJS module

const dotenv = require('dotenv');

dotenv.config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const knexConfig = {
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

// const production = {
//   client: 'postgresql',
//   connection: {
//     database: 'my_db',
//     user: 'username',
//     password: 'password'
//   },
//   pool: {
//     min: 2,
//     max: 10
//   },
//   migrations: {
//     tableName: 'knex_migrations'
//   }
// };

module.exports = {
  knexConfig,
};
