// RESPONSIBILITY: Deterministically seeds the profile table for local/test environments.
// FLOW: Master seed -> ProfileSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { ProfileEntity } from '@/backend_superadmin/modules/backend_superadmin/profile/profile.entity';

export class ProfileSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(ProfileEntity);
    await repository.count();
  }
}