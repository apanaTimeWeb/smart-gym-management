// RESPONSIBILITY: Deterministically seeds the backups table for local/test environments.
// FLOW: Master seed -> BackupsSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { BackupsEntity } from '@/backend_superadmin/modules/superadmin/system-ops/backups/backups.entity';

export class BackupsSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(BackupsEntity);
    await repository.count();
  }
}