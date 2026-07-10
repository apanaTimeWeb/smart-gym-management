import 'dotenv/config';
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
});

async function check() {
  await AppDataSource.initialize();
  const tables = await AppDataSource.query(`SELECT tablename FROM pg_tables WHERE schemaname='public'`);
  console.log('Tables in public schema:', tables.map(t => t.tablename).join(', '));
  await AppDataSource.destroy();
}

check().catch(console.error);
