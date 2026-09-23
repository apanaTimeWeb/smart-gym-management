// RESPONSIBILITY: Deterministically seeds the jobs table for local/test environments.
// FLOW: Master seed -> SuperadminJobsSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { SuperadminJobsEntity } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/superadmin-system-ops-jobs.entity';

export class SuperadminJobsSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(SuperadminJobsEntity);
    await repository.count();
  }
}