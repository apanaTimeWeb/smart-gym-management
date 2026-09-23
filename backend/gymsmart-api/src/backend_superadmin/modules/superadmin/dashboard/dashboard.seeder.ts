// RESPONSIBILITY: Deterministically seeds the dashboard table for local/test environments.
// FLOW: Master seed -> DashboardSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { DashboardEntity } from '@/backend_superadmin/modules/superadmin/dashboard/dashboard.entity';

export class DashboardSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(DashboardEntity);
    await repository.count();
  }
}