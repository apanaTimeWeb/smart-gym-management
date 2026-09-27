// RESPONSIBILITY: Owns deterministic, idempotent Manager feature seed data for the tenant database.
// FLOW: Master seed runner -> feature seeder -> tenant DataSource -> stable UUID upsert.
import { DataSource } from 'typeorm';

import { ManagerProfileEntity } from '@/backend_manager/manager_modules/profile/manager-profile.entity';
import { ProfileRecordStatus } from '@/backend_manager/manager_modules/profile/manager-profile.constants';

export class ManagerProfileSeeder {
  /** Seeds one stable Manager profile record and updates the same row on subsequent runs. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(ManagerProfileEntity);
    await (repository as any).upsert({ id: '00000000-0000-4000-8000-000000000017', payload: { seedKey: 'manager:profile:v1', name: 'Manager Profile Seed', status: 'ACTIVE' } , status: ProfileRecordStatus.ACTIVE }, ['id']);
  }
}

export { ManagerProfileSeeder as ProfileSeeder };
