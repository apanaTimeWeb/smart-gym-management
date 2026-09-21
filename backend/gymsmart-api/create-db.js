const { Client } = require('pg');

async function createDatabase() {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    password: 'postgres',
    port: 5432,
    database: 'postgres' // connect to default database to create the new one
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL');
    
    const dbName = 'gymsmart';
    const res = await client.query(`SELECT datname FROM pg_catalog.pg_database WHERE datname = '${dbName}'`);
    
    if (res.rowCount === 0) {
      console.log(`Database ${dbName} not found, creating...`);
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log('Database created successfully.');
    } else {
      console.log(`Database ${dbName} already exists.`);
    }
  } catch (err) {
    console.error('Error creating database:', err);
  } finally {
    await client.end();
  }
}

createDatabase();
