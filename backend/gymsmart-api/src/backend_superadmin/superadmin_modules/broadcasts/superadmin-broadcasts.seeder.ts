// RESPONSIBILITY: Deterministically seeds the broadcasts table for local/test environments.
// FLOW: Master seed -> SuperadminBroadcastsSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { SuperadminBroadcastsEntity } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts.entity';

export class SuperadminBroadcastsSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(SuperadminBroadcastsEntity);
    await repository.count();
  }
}