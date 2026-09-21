// RESPONSIBILITY: Runs master database migrations as an explicit, repeatable deployment operation.
// FLOW: CLI → master DataSource → TypeORM migrations → master PostgreSQL.
import 'reflect-metadata';

import 'dotenv/config';

import { DataSource } from 'typeorm';

import { buildMasterDataSourceOptions } from '@/core/database/master-data-source-options';


async function runMasterMigrations(): Promise<void> {
  const dataSource = new DataSource(buildMasterDataSourceOptions());
  await dataSource.initialize();
  await dataSource.runMigrations();
  await dataSource.destroy();
}

runMasterMigrations().catch((error: unknown) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}
`);
  process.exitCode = 1;
});
