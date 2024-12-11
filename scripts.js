const knex = require('knex')({
  client: 'mysql2', // or 'pg' for PostgreSQL
  connection:
    'mysql://root:GnCAwAfcPbCQOnWUEIArKbBAzizVcarn@junction.proxy.rlwy.net:50974/railway',
});

async function deleteSessionsTable() {
  try {
    // Check if the `sessions` table exists
    const tableExists = await knex.schema.hasTable('sessions');
    if (tableExists) {
      console.log('Deleting existing sessions table...');
      await knex.schema.dropTable('sessions');
      console.log('Sessions table deleted successfully.');
    } else {
      console.log('Sessions table does not exist.');
    }
  } catch (error) {
    console.error('Error deleting sessions table:', error);
  } finally {
    knex.destroy(); // Close the database connection
  }
}

deleteSessionsTable();
