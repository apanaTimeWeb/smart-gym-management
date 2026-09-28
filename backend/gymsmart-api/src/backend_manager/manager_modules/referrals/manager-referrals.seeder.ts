// RESPONSIBILITY: Owns deterministic, idempotent Manager feature seed data for the tenant database.
// FLOW: Master seed runner -> feature seeder -> tenant DataSource -> stable UUID upsert.
import { DataSource } from 'typeorm';

import { ManagerReferralsEntity } from '@/backend_manager/manager_modules/referrals/manager-referrals.entity';
import { ReferralsRecordStatus } from '@/backend_manager/manager_modules/referrals/manager-referrals.constants';

export class ManagerReferralsSeeder {
  /** Seeds one stable Manager referrals record and updates the same row on subsequent runs. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(ManagerReferralsEntity);
    await (repository as any).upsert({ id: '00000000-0000-4000-8000-000000000015', payload: { seedKey: 'manager:referrals:v1', name: 'Manager Referrals Seed', status: 'ACTIVE' } , status: ReferralsRecordStatus.ACTIVE, currency: 'INR' }, ['id']);
  }
}

export { ManagerReferralsSeeder as ReferralsSeeder };
