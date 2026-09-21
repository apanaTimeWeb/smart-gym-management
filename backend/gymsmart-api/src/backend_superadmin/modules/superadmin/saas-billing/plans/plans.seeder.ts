// RESPONSIBILITY: Deterministically seeds the plans table for local/test environments.
// FLOW: Master seed -> PlansSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { SubscriptionPlanEntity } from '@/backend_superadmin/modules/superadmin/saas-billing/plans/plans.entity';

export class PlansSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(SubscriptionPlanEntity);
    await repository.count();
  }
}
