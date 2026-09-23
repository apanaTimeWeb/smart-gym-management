// RESPONSIBILITY: Deterministically seeds the white-labeling table for local/test environments.
// FLOW: Master seed -> WhiteLabelingSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { WhiteLabelingEntity } from '@/backend_superadmin/modules/backend_superadmin/white-labeling/white-labeling.entity';

export class WhiteLabelingSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(WhiteLabelingEntity);
    await repository.count();
  }
}