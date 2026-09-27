// RESPONSIBILITY: Owns deterministic, idempotent Manager feature seed data for the tenant database.
// FLOW: Master seed runner -> feature seeder -> tenant DataSource -> stable UUID upsert.
import { DataSource } from 'typeorm';

import { ManagerStoreEntity } from '@/backend_manager/manager_modules/store/manager-store.entity';
import { StoreRecordStatus } from '@/backend_manager/manager_modules/store/manager-store.constants';

export class ManagerStoreSeeder {
  /** Seeds one stable Manager store record and updates the same row on subsequent runs. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(ManagerStoreEntity);
    await (repository as any).upsert({ id: '00000000-0000-4000-8000-000000000010', payload: { seedKey: 'manager:store:v1', name: 'Manager Store Seed', status: 'ACTIVE' } , status: StoreRecordStatus.ACTIVE, currency: 'INR' }, ['id']);
  }
}

export { ManagerStoreSeeder as StoreSeeder };
