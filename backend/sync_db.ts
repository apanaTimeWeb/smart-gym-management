import 'dotenv/config';
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true,
  dropSchema: false,
  entities: [__dirname.replace(/\\/g, '/') + '/src/**/*.entity{.ts,.js}'],
});

async function sync() {
  console.log('Connecting to database to synchronize schema...');
  await AppDataSource.initialize();
  console.log('Schema synchronized successfully!');
  await AppDataSource.destroy();
}

sync().catch(err => {
  console.error('Error synchronizing schema:', err);
  process.exit(1);
});
