import dataSource from './src/database/data-source';

async function run() {
  await dataSource.initialize();
  const tables = await dataSource.query(`SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'`);
  console.log(JSON.stringify(tables, null, 2));
  process.exit(0);
}

run().catch(console.error);
