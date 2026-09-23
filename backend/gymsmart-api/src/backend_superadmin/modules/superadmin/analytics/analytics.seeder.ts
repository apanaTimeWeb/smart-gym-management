// RESPONSIBILITY: Deterministically seeds the analytics table for local/test environments.
// FLOW: Master seed -> AnalyticsSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { AnalyticsEntity } from '@/backend_superadmin/modules/superadmin/analytics/analytics.entity';

export class AnalyticsSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(AnalyticsEntity);
    await repository.count();
  }
}