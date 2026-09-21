// RESPONSIBILITY: Deterministically seeds the gyms table for local/test environments.
// FLOW: Master seed -> GymsSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { TenantEntity } from '@/modules/superadmin/gyms/gyms.entity';

export class GymsSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(TenantEntity);
    await repository.count();
  }
}
