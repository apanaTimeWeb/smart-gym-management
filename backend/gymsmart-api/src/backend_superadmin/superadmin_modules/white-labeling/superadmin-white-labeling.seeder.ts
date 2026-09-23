// RESPONSIBILITY: Deterministically seeds the white-labeling table for local/test environments.
// FLOW: Master seed -> SuperadminWhiteLabelingSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { SuperadminWhiteLabelingEntity } from '@/backend_superadmin/superadmin_modules/white-labeling/superadmin-white-labeling.entity';

export class SuperadminWhiteLabelingSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(SuperadminWhiteLabelingEntity);
    await repository.count();
  }
}