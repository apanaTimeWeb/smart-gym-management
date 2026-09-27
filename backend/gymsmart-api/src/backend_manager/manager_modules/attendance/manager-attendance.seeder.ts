// RESPONSIBILITY: Owns deterministic, idempotent Manager feature seed data for the tenant database.
// FLOW: Master seed runner -> feature seeder -> tenant DataSource -> stable UUID upsert.
import { DataSource } from 'typeorm';

import { ManagerAttendanceEntity } from '@/backend_manager/manager_modules/attendance/manager-attendance.entity';
import { AttendanceRecordStatus } from '@/backend_manager/manager_modules/attendance/manager-attendance.constants';

export class ManagerAttendanceSeeder {
  /** Seeds one stable Manager attendance record and updates the same row on subsequent runs. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(ManagerAttendanceEntity);
    await (repository as any).upsert({ id: '00000000-0000-4000-8000-000000000020', payload: { seedKey: 'manager:attendance:v1', name: 'Manager Attendance Seed', status: 'ACTIVE' } , status: AttendanceRecordStatus.ACTIVE }, ['id']);
  }
}

export { ManagerAttendanceSeeder as AttendanceSeeder };
