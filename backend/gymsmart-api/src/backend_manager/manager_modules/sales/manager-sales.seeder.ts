// RESPONSIBILITY: Owns deterministic, idempotent Manager feature seed data for the tenant database.
// FLOW: Master seed runner -> feature seeder -> tenant DataSource -> stable UUID upsert.
import { DataSource } from 'typeorm';

import { ManagerSalesEntity } from '@/backend_manager/manager_modules/sales/manager-sales.entity';
import { SalesRecordStatus } from '@/backend_manager/manager_modules/sales/manager-sales.constants';

export class ManagerSalesSeeder {
  /** Seeds one stable Manager sales record and updates the same row on subsequent runs. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(ManagerSalesEntity);
    await (repository as any).upsert({ id: '00000000-0000-4000-8000-000000000004', payload: { seedKey: 'manager:sales:v1', name: 'Manager Sales Seed', status: 'ACTIVE' } , status: SalesRecordStatus.ACTIVE, currency: 'INR' }, ['id']);
  }
}

export { ManagerSalesSeeder as SalesSeeder };
