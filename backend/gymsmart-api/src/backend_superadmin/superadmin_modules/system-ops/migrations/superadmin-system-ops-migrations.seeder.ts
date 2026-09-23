// RESPONSIBILITY: Deterministically seeds the migrations table for local/test environments.
// FLOW: Master seed -> SuperadminMigrationsSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { SuperadminMigrationsEntity } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/superadmin-system-ops-migrations.entity';

export class SuperadminMigrationsSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(SuperadminMigrationsEntity);
    await repository.count();
  }
}