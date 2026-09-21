// RESPONSIBILITY: Provisions the local/default tenant PostgreSQL database without creating a physical server per tenant.
// FLOW: CLI -> master tenant metadata -> PostgreSQL CREATE DATABASE -> tenant migration command.

import 'reflect-metadata';
import 'dotenv/config';
import { Client } from 'pg';

function safeDatabaseIdentifier(value: string): string {
  if (!/^[a-zA-Z0-9_]+$/.test(value)) throw new Error('INVALID_TENANT_DATABASE_NAME');
  return `"${value}"`;
}

async function provision(): Promise<void> {
  const databaseName = process.env.SEED_TENANT_DATABASE ?? 'buildronix_tenant_default';
  const client = new Client({
    host: process.env.TENANT_DB_HOST ?? 'localhost',
    port: Number(process.env.TENANT_DB_PORT ?? 5432),
    user: process.env.TENANT_DB_USER ?? 'postgres',
    password: process.env.TENANT_DB_PASSWORD ?? '',
    database: process.env.TENANT_DB_ADMIN_DATABASE ?? 'postgres',
    connectionTimeoutMillis: 30000,
  });
  await client.connect();
  const result = await client.query('SELECT 1 FROM pg_database WHERE datname = $1', [databaseName]);
  if (result.rowCount === 0) await client.query(`CREATE DATABASE ${safeDatabaseIdentifier(databaseName)}`);
  await client.end();
}

void provision().catch(() => {
  process.exitCode = 1;
});
