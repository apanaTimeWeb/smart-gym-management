// RESPONSIBILITY: Owns deterministic, idempotent Manager feature seed data for the tenant database.
// FLOW: Master seed runner -> feature seeder -> tenant DataSource -> stable UUID upsert.
import { DataSource } from 'typeorm';

import { ManagerMaintenanceEntity } from '@/backend_manager/manager_modules/maintenance/manager-maintenance.entity';
import { MaintenanceRecordStatus } from '@/backend_manager/manager_modules/maintenance/manager-maintenance.constants';

export class ManagerMaintenanceSeeder {
  /** Seeds one stable Manager maintenance record and updates the same row on subsequent runs. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(ManagerMaintenanceEntity);
    await (repository as any).upsert({ id: '00000000-0000-4000-8000-000000000009', payload: { seedKey: 'manager:maintenance:v1', name: 'Manager Maintenance Seed', status: 'ACTIVE' } , status: MaintenanceRecordStatus.ACTIVE, currency: 'INR' }, ['id']);
  }
}

export { ManagerMaintenanceSeeder as MaintenanceSeeder };
