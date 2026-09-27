// RESPONSIBILITY: Owns deterministic, idempotent Manager feature seed data for the tenant database.
// FLOW: Master seed runner -> feature seeder -> tenant DataSource -> stable UUID upsert.
import { DataSource } from 'typeorm';

import { ManagerHrEntity } from '@/backend_manager/manager_modules/hr/manager-hr.entity';
import { HrRecordStatus } from '@/backend_manager/manager_modules/hr/manager-hr.constants';

export class ManagerHrSeeder {
  /** Seeds one stable Manager hr record and updates the same row on subsequent runs. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(ManagerHrEntity);
    await (repository as any).upsert({ id: '00000000-0000-4000-8000-000000000022', payload: { seedKey: 'manager:hr:v1', name: 'Manager Hr Seed', status: 'ACTIVE' } , status: HrRecordStatus.ACTIVE, currency: 'INR' }, ['id']);
  }
}

export { ManagerHrSeeder as HrSeeder };
