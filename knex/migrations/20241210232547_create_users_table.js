/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  await knex.schema.createTable('users', (table) => {
    table.increments(); // Auto-incrementing primary key (id)
    table.string('username').notNullable().unique(); // Username (must be unique)
    table.string('email').notNullable().unique(); // Email (must be unique)
    table.string('password').notNullable(); // Password (hashed)
    table.timestamps(true, true); // Automatically adds created_at and updated_at
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  await knex.schema.dropTable('users'); // Drops the users table if rolled back
};

