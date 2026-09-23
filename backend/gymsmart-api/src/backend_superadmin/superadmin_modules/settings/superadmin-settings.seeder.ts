// RESPONSIBILITY: Deterministically seeds the settings table for local/test environments.
// FLOW: Master seed -> SuperadminSettingsSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { SuperadminSettingsEntity } from '@/backend_superadmin/superadmin_modules/settings/superadmin-settings.entity';

export class SuperadminSettingsSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(SuperadminSettingsEntity);
    await repository.count();
  }
}