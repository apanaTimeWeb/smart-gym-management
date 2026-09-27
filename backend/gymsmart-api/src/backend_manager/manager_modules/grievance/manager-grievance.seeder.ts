// RESPONSIBILITY: Owns deterministic, idempotent Manager feature seed data for the tenant database.
// FLOW: Master seed runner -> feature seeder -> tenant DataSource -> stable UUID upsert.
import { DataSource } from 'typeorm';

import { ManagerGrievanceEntity } from '@/backend_manager/manager_modules/grievance/manager-grievance.entity';
import { GrievanceRecordStatus } from '@/backend_manager/manager_modules/grievance/manager-grievance.constants';

export class ManagerGrievanceSeeder {
  /** Seeds one stable Manager grievance record and updates the same row on subsequent runs. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(ManagerGrievanceEntity);
    await (repository as any).upsert({ id: '00000000-0000-4000-8000-000000000012', payload: { seedKey: 'manager:grievance:v1', name: 'Manager Grievance Seed', status: 'ACTIVE' } , status: GrievanceRecordStatus.ACTIVE }, ['id']);
  }
}

export { ManagerGrievanceSeeder as GrievanceSeeder };
