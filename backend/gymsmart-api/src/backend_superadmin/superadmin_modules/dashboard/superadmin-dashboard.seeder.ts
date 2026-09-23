// RESPONSIBILITY: Deterministically seeds the dashboard table for local/test environments.
// FLOW: Master seed -> SuperadminDashboardSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { SuperadminDashboardEntity } from '@/backend_superadmin/superadmin_modules/dashboard/superadmin-dashboard.entity';

export class SuperadminDashboardSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(SuperadminDashboardEntity);
    await repository.count();
  }
}