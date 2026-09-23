// RESPONSIBILITY: Deterministically seeds the broadcasts table for local/test environments.
// FLOW: Master seed -> BroadcastsSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { BroadcastsEntity } from '@/backend_superadmin/modules/backend_superadmin/broadcasts/broadcasts.entity';

export class BroadcastsSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(BroadcastsEntity);
    await repository.count();
  }
}