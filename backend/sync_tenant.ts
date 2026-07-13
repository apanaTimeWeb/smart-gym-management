import 'dotenv/config';
import { DataSource } from 'typeorm';

async function syncTenant() {
  const masterUrl = process.env.DATABASE_URL;
  if (!masterUrl) throw new Error('No DATABASE_URL');
  
  const connectionKey = `tenant_db_2ef822dd-de53-473b-927b-6289f5fa5a1a`;
  const parsedUrl = new URL(masterUrl);
  parsedUrl.pathname = `/${connectionKey}`;
  
  const AppDataSource = new DataSource({
    type: 'postgres',
    url: parsedUrl.toString(),
    synchronize: true,
    dropSchema: false,
    entities: [__dirname.replace(/\\/g, '/') + '/src/**/*.entity{.ts,.js}'],
  });

  console.log(`Connecting to database ${connectionKey} to synchronize schema...`);
  await AppDataSource.initialize();
  console.log('Schema synchronized successfully!');
  await AppDataSource.destroy();
}

syncTenant().catch(err => {
  console.error('Error synchronizing schema:', err);
  process.exit(1);
});
