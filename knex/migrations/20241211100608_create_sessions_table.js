/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
 await knex.schema.createTable('sessions', (table) => {
  table.string('sid', 255).primary(); // Session ID with a defined length
  table.jsonb('sess').notNullable(); // Session data using JSONB for better performance
  table.timestamp('expired', { useTz: true }).notNullable(); // Expiration timestamp (ensure timezone is used)
  table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now()); // Creation timestamp (optional)
  table
    .integer('user_id')
    .unsigned()
    .references('id')
    .inTable('users')
    .onDelete('CASCADE'); // Foreign key to users table
});

};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('sessions');
};
