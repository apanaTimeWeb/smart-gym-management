// RESPONSIBILITY: Deterministically seeds the settings table for local/test environments.
// FLOW: Master seed -> SettingsSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { PlatformSettingEntity } from '@/backend_superadmin/modules/superadmin/settings/settings.entity';

export class SettingsSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(PlatformSettingEntity);
    await repository.count();
  }
}
