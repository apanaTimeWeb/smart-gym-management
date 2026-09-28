// RESPONSIBILITY: Owns deterministic, idempotent Manager feature seed data for the tenant database.
// FLOW: Master seed runner -> feature seeder -> tenant DataSource -> stable UUID upsert.
import { DataSource } from 'typeorm';

import { ManagerPtEntity } from '@/backend_manager/manager_modules/pt/manager-pt.entity';
import { PtRecordStatus } from '@/backend_manager/manager_modules/pt/manager-pt.constants';

export class ManagerPtSeeder {
  /** Seeds one stable Manager pt record and updates the same row on subsequent runs. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(ManagerPtEntity);
    await (repository as any).upsert({ id: '00000000-0000-4000-8000-000000000018', payload: { seedKey: 'manager:pt:v1', name: 'Manager Pt Seed', status: 'ACTIVE' } , status: PtRecordStatus.ACTIVE, currency: 'INR' }, ['id']);
  }
}

export { ManagerPtSeeder as PtSeeder };
