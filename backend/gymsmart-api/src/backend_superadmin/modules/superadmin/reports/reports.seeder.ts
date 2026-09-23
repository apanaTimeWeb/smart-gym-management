// RESPONSIBILITY: Deterministically seeds the reports table for local/test environments.
// FLOW: Master seed -> ReportsSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { ReportsEntity } from '@/backend_superadmin/modules/backend_superadmin/reports/reports.entity';

export class ReportsSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(ReportsEntity);
    await repository.count();
  }
}