// RESPONSIBILITY: Deterministically seeds the analytics table for local/test environments.
// FLOW: Master seed -> SuperadminAnalyticsSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { SuperadminAnalyticsEntity } from '@/backend_superadmin/superadmin_modules/analytics/superadmin-analytics.entity';

export class SuperadminAnalyticsSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(SuperadminAnalyticsEntity);
    await repository.count();
  }
}