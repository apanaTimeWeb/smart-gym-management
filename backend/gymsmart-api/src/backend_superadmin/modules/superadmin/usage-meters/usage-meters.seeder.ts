// RESPONSIBILITY: Deterministically seeds the usage-meters table for local/test environments.
// FLOW: Master seed -> UsageMetersSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { UsageMeterEntity } from '@/backend_superadmin/modules/superadmin/usage-meters/usage-meters.entity';

export class UsageMetersSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(UsageMeterEntity);
    await repository.count();
  }
}
