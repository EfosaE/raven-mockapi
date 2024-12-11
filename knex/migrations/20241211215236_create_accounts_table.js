/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable('accounts', (table) => {
    table.increments(); // Auto-incrementing primary key (id)
    table.string('account_number').notNullable().unique(); // Account number
    table.string('account_name').notNullable(); // Account name
    table.string('bank').notNullable(); // Bank name
    table.string('amount').notNullable(); // Amount
    table.boolean('isPermanent').notNullable(); // Permanent account flag
    table.integer('user_id').unsigned().references('id').inTable('users'); // Foreign key to users
    table.timestamps(true, true); // Timestamps (created_at, updated_at)
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
