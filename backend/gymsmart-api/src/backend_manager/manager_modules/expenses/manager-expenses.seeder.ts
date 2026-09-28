// RESPONSIBILITY: Owns deterministic, idempotent Manager feature seed data for the tenant database.
// FLOW: Master seed runner -> feature seeder -> tenant DataSource -> stable UUID upsert.
import { DataSource } from 'typeorm';

import { ManagerExpensesEntity } from '@/backend_manager/manager_modules/expenses/manager-expenses.entity';
import { ExpensesRecordStatus } from '@/backend_manager/manager_modules/expenses/manager-expenses.constants';

export class ManagerExpensesSeeder {
  /** Seeds one stable Manager expenses record and updates the same row on subsequent runs. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(ManagerExpensesEntity);
    await (repository as any).upsert({ id: '00000000-0000-4000-8000-000000000008', payload: { seedKey: 'manager:expenses:v1', name: 'Manager Expenses Seed', status: 'ACTIVE' } , status: ExpensesRecordStatus.ACTIVE, currency: 'INR' }, ['id']);
  }
}

export { ManagerExpensesSeeder as ExpensesSeeder };
