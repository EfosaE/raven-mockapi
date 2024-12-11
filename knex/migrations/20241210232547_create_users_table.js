/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  await knex.schema.createTable('users', (table) => {
    table.increments(); // Auto-incrementing primary key (id)
    table.string('first_name').notNullable(); 
    table.string('last_name').notNullable(); 
    table.string('phone').notNullable().unique(); 
    table.string('email').notNullable().unique(); 
    table.string('password').notNullable(); // Password (hashed)
    table.timestamps(true, true); // Timestamps (created_at, updated_at)

    // Add a check constraint for the phone number format (E.164: +CountryCode + NationalNumber) but it only works for PostGres
    //  you have to do much more lowlevel stuff for MYsql.
    //  table.check(`phone ~ '^\\+\\d{1,3}\\d{7,14}$'`);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  await knex.schema.dropTable('users'); // Drops the users table if rolled back
};
