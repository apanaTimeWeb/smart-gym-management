import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Client } from 'pg';
import * as dotenv from 'dotenv';

async function createDatabaseIfNotExists() {
  dotenv.config();
  const dbName = process.env.MASTER_DB_NAME;
  if (!dbName) return;

  const client = new Client({
    user: process.env.MASTER_DB_USER || 'postgres',
    host: process.env.MASTER_DB_HOST || 'localhost',
    password: process.env.MASTER_DB_PASSWORD || 'postgres',
    port: parseInt(process.env.MASTER_DB_PORT || '5432', 10),
    database: 'postgres', // connect to default db to create the target one
  });

  try {
    await client.connect();
    const res = await client.query(`SELECT datname FROM pg_catalog.pg_database WHERE datname = $1`, [dbName]);
    if (res.rowCount === 0) {
      console.log(`Database "${dbName}" not found. Creating it now...`);
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`Database "${dbName}" created successfully.`);
    }
  } catch (err) {
    console.error('Error during database startup check:', err);
  } finally {
    await client.end();
  }
}

async function bootstrap() {
  await createDatabaseIfNotExists();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization, x-tenant-id, x-request-id',
  });
  // Set global prefix if needed: app.setGlobalPrefix('api/v1');
  await app.listen(5000);
  console.log('Unified Monolith running on port 5000');
}
bootstrap();
