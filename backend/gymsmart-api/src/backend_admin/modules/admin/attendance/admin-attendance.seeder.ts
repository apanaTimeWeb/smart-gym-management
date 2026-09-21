// RESPONSIBILITY: Seeds deterministic development data for Admin attendance; never used in production runtime.
// FLOW: CoreTenantSeeder -> AdminAttendanceSeeder -> TypeORM -> usage_snapshots.

import { DataSource } from 'typeorm';
import { AdminAttendanceEntity } from '@/backend_admin/modules/admin/attendance/entities/admin-attendance-entity';

export class AdminAttendanceSeeder {
  /** @description Inserts deterministic, idempotent seed records when the feature table is empty. @param dataSource Tenant database source. @returns Completion promise. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(AdminAttendanceEntity);
    const count = await repository.count();
    if (count > 0) return;
    await repository.save([
      repository.create({ payload: {
  "memberId": "00000000-0000-0000-0000-000000001001",
  "memberName": "Rahul Kumar",
  "memberPhone": "9000000001",
  "branchId": "00000000-0000-0000-0000-000000000101",
  "branchName": "Buildronix Central",
  "checkInTime": "2026-09-21T06:10:00Z",
  "checkOutTime": "2026-09-21T07:30:00Z",
  "date": "2026-09-21",
  "status": "present",
  "planName": "Growth",
  "sessionType": "GYM"
}, name: null, status: "present", branchId: "00000000-0000-0000-0000-000000000101" }),
      repository.create({ payload: {
  "memberId": "00000000-0000-0000-0000-000000001002",
  "memberName": "Neha Singh",
  "memberPhone": "9000000002",
  "branchId": "00000000-0000-0000-0000-000000000101",
  "branchName": "Buildronix Central",
  "checkInTime": "2026-09-21T06:45:00Z",
  "date": "2026-09-21",
  "status": "late",
  "planName": "Starter",
  "sessionType": "CARDIO"
}, name: null, status: "late", branchId: "00000000-0000-0000-0000-000000000101" })
    ]);
  }
}
