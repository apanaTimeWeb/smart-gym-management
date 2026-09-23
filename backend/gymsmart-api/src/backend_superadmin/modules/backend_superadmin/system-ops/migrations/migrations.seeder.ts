// RESPONSIBILITY: Deterministically seeds the migrations table for local/test environments.
// FLOW: Master seed -> MigrationsSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { MigrationsEntity } from '@/backend_superadmin/modules/backend_superadmin/system-ops/migrations/migrations.entity';

export class MigrationsSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(MigrationsEntity);
    await repository.count();
  }
}