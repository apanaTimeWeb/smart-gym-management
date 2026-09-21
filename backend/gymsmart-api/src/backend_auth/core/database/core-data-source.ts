// RESPONSIBILITY: Provides the migration DataSource using the same explicit PostgreSQL pool policy as runtime infrastructure.
// FLOW: TypeORM CLI -> CoreDataSource -> PostgreSQL migrations.

import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { DATABASE_CONFIG } from '@/backend_auth/core/config/database.config';
import { TIMEOUT_CONFIG } from '@/backend_auth/core/config/timeout.config';
const databaseUrl = process.env.DATABASE_URL ?? '';
if (!databaseUrl) throw new Error('DATABASE_URL is required for migrations.');

const CoreDataSource = new DataSource({
  type: 'postgres',
  url: databaseUrl,
  synchronize: false,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/core/database/migrations/*.ts'],
  extra: {
    max: Number(process.env.DATABASE_POOL_MAX ?? DATABASE_CONFIG.POOL_MAX),
    connectionTimeoutMillis: Number(process.env.DATABASE_ACQUIRE_TIMEOUT_MS ?? DATABASE_CONFIG.ACQUIRE_TIMEOUT_MS),
    idleTimeoutMillis: Number(process.env.DATABASE_IDLE_TIMEOUT_MS ?? DATABASE_CONFIG.IDLE_TIMEOUT_MS),
    statement_timeout: TIMEOUT_CONFIG.DB_QUERY_DEFAULT_MS,
  },
});

export default CoreDataSource;
