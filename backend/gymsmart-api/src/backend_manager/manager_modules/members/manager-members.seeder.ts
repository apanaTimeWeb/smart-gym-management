// RESPONSIBILITY: Owns deterministic, idempotent Manager feature seed data for the tenant database.
// FLOW: Master seed runner -> feature seeder -> tenant DataSource -> stable UUID upsert.
import { DataSource } from 'typeorm';

import { ManagerMembersEntity } from '@/backend_manager/manager_modules/members/manager-members.entity';
import { MembersRecordStatus } from '@/backend_manager/manager_modules/members/manager-members.constants';

export class ManagerMembersSeeder {
  /** Seeds one stable Manager members record and updates the same row on subsequent runs. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(ManagerMembersEntity);
    await (repository as any).upsert({ id: '00000000-0000-4000-8000-000000000011', payload: { seedKey: 'manager:members:v1', name: 'Manager Members Seed', status: 'ACTIVE' } , status: MembersRecordStatus.ACTIVE, currency: 'INR' }, ['id']);
  }
}

export { ManagerMembersSeeder as MembersSeeder };
