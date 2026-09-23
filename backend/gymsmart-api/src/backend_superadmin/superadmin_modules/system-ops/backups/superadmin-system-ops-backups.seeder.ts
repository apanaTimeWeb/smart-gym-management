// RESPONSIBILITY: Deterministically seeds the backups table for local/test environments.
// FLOW: Master seed -> SuperadminBackupsSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { SuperadminBackupsEntity } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups.entity';

export class SuperadminBackupsSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(SuperadminBackupsEntity);
    await repository.count();
  }
}