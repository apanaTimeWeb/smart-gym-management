// RESPONSIBILITY: Owns deterministic, idempotent Manager feature seed data for the tenant database.
// FLOW: Master seed runner -> feature seeder -> tenant DataSource -> stable UUID upsert.
import { DataSource } from 'typeorm';

import { ManagerReportsEntity } from '@/backend_manager/manager_modules/reports/manager-reports.entity';
import { ReportsRecordStatus } from '@/backend_manager/manager_modules/reports/manager-reports.constants';

export class ManagerReportsSeeder {
  /** Seeds one stable Manager reports record and updates the same row on subsequent runs. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(ManagerReportsEntity);
    await (repository as any).upsert({ id: '00000000-0000-4000-8000-000000000002', payload: { seedKey: 'manager:reports:v1', name: 'Manager Reports Seed', status: 'ACTIVE' } , status: ReportsRecordStatus.ACTIVE, currency: 'INR' }, ['id']);
  }
}

export { ManagerReportsSeeder as ReportsSeeder };
