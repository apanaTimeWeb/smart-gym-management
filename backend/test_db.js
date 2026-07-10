require('dotenv').config();
const { Client } = require('pg');
const client = new Client({ connectionString: process.env.DATABASE_URL });

async function test() {
  await client.connect();
  try {
    const res = await client.query('SELECT count(*) FROM inquiries');
    console.log('Inquiries count:', res.rows[0].count);
    const res2 = await client.query(`SELECT enum_range(NULL::inquiries_status_enum)`);
    console.log('Enums:', res2.rows);
  } catch (err) {
    console.error('Error querying DB:', err.message);
  } finally {
    await client.end();
  }
}
test();
