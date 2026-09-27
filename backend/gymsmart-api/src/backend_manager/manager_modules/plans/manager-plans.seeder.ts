// RESPONSIBILITY: Owns deterministic, idempotent Manager feature seed data for the tenant database.
// FLOW: Master seed runner -> feature seeder -> tenant DataSource -> stable UUID upsert.
import { DataSource } from 'typeorm';

import { ManagerPlansEntity } from '@/backend_manager/manager_modules/plans/manager-plans.entity';
import { PlansRecordStatus } from '@/backend_manager/manager_modules/plans/manager-plans.constants';

export class ManagerPlansSeeder {
  /** Seeds one stable Manager plans record and updates the same row on subsequent runs. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(ManagerPlansEntity);
    await (repository as any).upsert({ id: '00000000-0000-4000-8000-000000000005', payload: { seedKey: 'manager:plans:v1', name: 'Manager Plans Seed', status: 'ACTIVE' } , status: PlansRecordStatus.ACTIVE, currency: 'INR' }, ['id']);
  }
}

export { ManagerPlansSeeder as PlansSeeder };
