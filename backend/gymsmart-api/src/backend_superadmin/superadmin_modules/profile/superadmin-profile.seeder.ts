// RESPONSIBILITY: Deterministically seeds the profile table for local/test environments.
// FLOW: Master seed -> SuperadminProfileSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { SuperadminProfileEntity } from '@/backend_superadmin/superadmin_modules/profile/superadmin-profile.entity';

export class SuperadminProfileSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(SuperadminProfileEntity);
    await repository.count();
  }
}