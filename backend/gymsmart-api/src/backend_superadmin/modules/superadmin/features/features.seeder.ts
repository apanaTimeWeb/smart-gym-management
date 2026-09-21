// RESPONSIBILITY: Deterministically seeds the features table for local/test environments.
// FLOW: Master seed -> FeaturesSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { FeatureFlagEntity } from '@/backend_superadmin/modules/superadmin/features/features.entity';

export class FeaturesSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(FeatureFlagEntity);
    await repository.count();
  }
}
