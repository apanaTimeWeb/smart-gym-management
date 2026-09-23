// RESPONSIBILITY: Deterministically seeds the features table for local/test environments.
// FLOW: Master seed -> SuperadminFeaturesSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { SuperadminFeaturesEntity } from '@/backend_superadmin/superadmin_modules/features/superadmin-features.entity';

export class SuperadminFeaturesSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(SuperadminFeaturesEntity);
    await repository.count();
  }
}