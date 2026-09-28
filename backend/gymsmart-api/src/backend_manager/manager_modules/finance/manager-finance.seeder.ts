// RESPONSIBILITY: Owns deterministic, idempotent Manager feature seed data for the tenant database.
// FLOW: Master seed runner -> feature seeder -> tenant DataSource -> stable UUID upsert.
import { DataSource } from 'typeorm';

import { ManagerFinanceEntity } from '@/backend_manager/manager_modules/finance/manager-finance.entity';
import { FinanceRecordStatus } from '@/backend_manager/manager_modules/finance/manager-finance.constants';

export class ManagerFinanceSeeder {
  /** Seeds one stable Manager finance record and updates the same row on subsequent runs. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(ManagerFinanceEntity);
    await (repository as any).upsert({ id: '00000000-0000-4000-8000-000000000001', payload: { seedKey: 'manager:finance:v1', name: 'Manager Finance Seed', status: 'ACTIVE' } , status: FinanceRecordStatus.ACTIVE, currency: 'INR' }, ['id']);
  }
}

export { ManagerFinanceSeeder as FinanceSeeder };
