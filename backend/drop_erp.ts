import dataSource from './src/database/data-source';

async function run() {
  await dataSource.initialize();
  const tables = [
    'exercises', 'diet_plans', 'inquiries', 'members', 'payments', 
    'staff', 'payrolls', 'attendances', 'orders', 'order_items', 'products'
  ];
  for (const t of tables) {
    console.log(`Dropping ${t}`);
    await dataSource.query(`DROP TABLE IF EXISTS "${t}" CASCADE`);
  }
  process.exit(0);
}

run().catch(console.error);
