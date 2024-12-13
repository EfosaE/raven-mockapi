/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('transactions', (table) => {
    table.increments('id').primary(); // Primary Key
    table
      .integer('account_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('accounts')
      .onDelete('CASCADE'); // Foreign Key to accounts table (initiating account)
    table
      .integer('recipient_account_id')
      .unsigned()
      .nullable()
      .references('id')
      .inTable('accounts')
      .onDelete('SET NULL'); // Foreign Key for internal transfers (nullable for external transfers)
    table.string('trx_ref').notNullable().unique(); // Unique transaction reference
    table.string('merchant_ref').nullable(); // Optional merchant reference
    table.enum('type', ['DEPOSIT', 'TRANSFER', 'WITHDRAWAL']).notNullable(); // Transaction type
    table.string('amount').notNullable(); // Transaction amount
    table
      .enum('status', ['PENDING', 'COMPLETED', 'FAILED'])
      .defaultTo('PENDING'); // Transaction status
    table.string('bank').nullable(); // Bank name (for external transfers)
    table.string('bank_code').nullable(); // Bank code (for external transfers)
    table.string('account_number').nullable(); // Recipient account number (for external transfers)
    table.string('account_name').nullable(); // Recipient account name (for external transfers)
    table.string('narration').nullable(); // Transaction narration
    table.decimal('fee', 14, 2).defaultTo(0); // Transaction fee
    table.timestamp('created_at').defaultTo(knex.fn.now()); // Timestamp of transaction creation
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('transactions');
};
