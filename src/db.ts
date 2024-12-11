import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const db = knex({
  client: 'mysql2',
  connection: process.env.DATABASE_URL, // Connection URL
});

console.log(process.env.DATABASE_URL);

export default db;
