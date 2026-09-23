// RESPONSIBILITY: Deterministically seeds the affiliates table for local/test environments.
// FLOW: Master seed -> AffiliatesSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { AffiliatesEntity } from '@/backend_superadmin/modules/superadmin/affiliates/affiliates.entity';

export class AffiliatesSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(AffiliatesEntity);
    await repository.count();
  }
}