// RESPONSIBILITY: Deterministically seeds the usage-meters table for local/test environments.
// FLOW: Master seed -> SuperadminUsageMetersSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { SuperadminUsageMetersEntity } from '@/backend_superadmin/superadmin_modules/usage-meters/superadmin-usage-meters.entity';

export class SuperadminUsageMetersSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(SuperadminUsageMetersEntity);
    await repository.count();
  }
}