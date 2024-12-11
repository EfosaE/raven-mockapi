import knex from 'knex';
const knexfile = require('../knexfile.js'); // from my knexfile configurations


// Determine the current environment (default to 'development')
const environment = process.env.NODE_ENV || 'development';

// Get the specific configuration for the environment
const config = knexfile[environment];

// Initialize Knex with the configuration
const db = knex(config);

export default db;
