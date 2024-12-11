// Update with your config settings and using commonJS module

const dotenv = require('dotenv');

dotenv.config({ path: '../.env' }); 

console.log(process.env.DATABASE_URL); // Check if it logs the correct value


/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
console.log(process.env.DATABASE_URL);
const development = {
  client: 'mysql2', // or 'pg' for PostgreSQL
  connection: process.env.DATABASE_URL,
  migrations: {
    directory: './migrations',
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: './seeds',
  },
};

// const staging = {
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
  development,
  // staging,
  // production
};
