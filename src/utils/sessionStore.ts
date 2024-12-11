
import db from '../db';
import { ConnectSessionKnexStore } from 'connect-session-knex';





export const sessionStore = new ConnectSessionKnexStore({
  knex: db,
  tableName: 'sessions',
  createTable: false, // generated the table via migration to reference user id
  cleanupInterval: 600000, // Clear expired sessions every 10 minutes
});


