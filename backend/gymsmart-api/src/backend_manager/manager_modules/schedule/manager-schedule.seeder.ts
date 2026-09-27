// RESPONSIBILITY: Owns deterministic, idempotent Manager feature seed data for the tenant database.
// FLOW: Master seed runner -> feature seeder -> tenant DataSource -> stable UUID upsert.
import { DataSource } from 'typeorm';

import { ManagerScheduleEntity } from '@/backend_manager/manager_modules/schedule/manager-schedule.entity';
import { ScheduleRecordStatus } from '@/backend_manager/manager_modules/schedule/manager-schedule.constants';

export class ManagerScheduleSeeder {
  /** Seeds one stable Manager schedule record and updates the same row on subsequent runs. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(ManagerScheduleEntity);
    await (repository as any).upsert({ id: '00000000-0000-4000-8000-000000000003', payload: { seedKey: 'manager:schedule:v1', name: 'Manager Schedule Seed', status: 'ACTIVE' } , status: ScheduleRecordStatus.ACTIVE }, ['id']);
  }
}

export { ManagerScheduleSeeder as ScheduleSeeder };
