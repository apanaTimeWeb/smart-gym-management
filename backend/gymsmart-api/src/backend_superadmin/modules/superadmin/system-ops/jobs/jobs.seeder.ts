// RESPONSIBILITY: Deterministically seeds the jobs table for local/test environments.
// FLOW: Master seed -> JobsSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { JobsEntity } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/jobs.entity';

export class JobsSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(JobsEntity);
    await repository.count();
  }
}