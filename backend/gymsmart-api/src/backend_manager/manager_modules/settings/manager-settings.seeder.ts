// RESPONSIBILITY: Owns deterministic, idempotent Manager feature seed data for the tenant database.
// FLOW: Master seed runner -> feature seeder -> tenant DataSource -> stable UUID upsert.
import { DataSource } from 'typeorm';

import { ManagerSettingsEntity } from '@/backend_manager/manager_modules/settings/manager-settings.entity';
import { SettingsRecordStatus } from '@/backend_manager/manager_modules/settings/manager-settings.constants';

export class ManagerSettingsSeeder {
  /** Seeds one stable Manager settings record and updates the same row on subsequent runs. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(ManagerSettingsEntity);
    await (repository as any).upsert({ id: '00000000-0000-4000-8000-000000000016', payload: { seedKey: 'manager:settings:v1', name: 'Manager Settings Seed', status: 'ACTIVE' } , status: SettingsRecordStatus.ACTIVE }, ['id']);
  }
}

export { ManagerSettingsSeeder as SettingsSeeder };
