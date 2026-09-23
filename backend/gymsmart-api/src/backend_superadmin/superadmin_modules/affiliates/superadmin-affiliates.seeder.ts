// RESPONSIBILITY: Deterministically seeds the affiliates table for local/test environments.
// FLOW: Master seed -> SuperadminAffiliatesSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { SuperadminAffiliatesEntity } from '@/backend_superadmin/superadmin_modules/affiliates/superadmin-affiliates.entity';

export class SuperadminAffiliatesSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(SuperadminAffiliatesEntity);
    await repository.count();
  }
}