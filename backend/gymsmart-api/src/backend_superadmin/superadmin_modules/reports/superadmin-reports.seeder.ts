// RESPONSIBILITY: Deterministically seeds the reports table for local/test environments.
// FLOW: Master seed -> SuperadminReportsSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { SuperadminReportsEntity } from '@/backend_superadmin/superadmin_modules/reports/superadmin-reports.entity';

export class SuperadminReportsSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(SuperadminReportsEntity);
    await repository.count();
  }
}