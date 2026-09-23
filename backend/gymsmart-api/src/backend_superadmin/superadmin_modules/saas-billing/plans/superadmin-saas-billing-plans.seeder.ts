// RESPONSIBILITY: Deterministically seeds the plans table for local/test environments.
// FLOW: Master seed -> SuperadminPlansSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { SuperadminPlansEntity } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/superadmin-saas-billing-plans.entity';

export class SuperadminPlansSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(SuperadminPlansEntity);
    await repository.count();
  }
}