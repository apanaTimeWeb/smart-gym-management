// RESPONSIBILITY: Seeds deterministic development data for Admin notifications; never used in production runtime.
// FLOW: CoreTenantSeeder -> AdminNotificationsSeeder -> TypeORM -> usage_snapshots.

import { DataSource } from 'typeorm';
import { AdminNotificationsEntity } from '@/backend_admin/modules/admin/notifications/entities/admin-notifications-entity';

export class AdminNotificationsSeeder {
  /** @description Inserts deterministic, idempotent seed records when the feature table is empty. @param dataSource Tenant database source. @returns Completion promise. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(AdminNotificationsEntity);
    const count = await repository.count();
    if (count > 0) return;
    await repository.save([
      repository.create({ payload: {
  "title": "Memberships expiring",
  "body": "14 memberships expire this week.",
  "severity": "WARNING",
  "read": false,
  "createdAt": "2026-09-21T08:00:00Z",
  "branchId": "00000000-0000-0000-0000-000000000101",
  "branchName": "Buildronix Central"
}, name: null, status: null, branchId: "00000000-0000-0000-0000-000000000101" }),
      repository.create({ payload: {
  "title": "Low stock",
  "body": "Protein inventory is below threshold.",
  "severity": "CRITICAL",
  "read": false,
  "createdAt": "2026-09-21T07:10:00Z",
  "branchId": "00000000-0000-0000-0000-000000000102",
  "branchName": "Buildronix North"
}, name: null, status: null, branchId: "00000000-0000-0000-0000-000000000102" })
    ]);
  }
}
