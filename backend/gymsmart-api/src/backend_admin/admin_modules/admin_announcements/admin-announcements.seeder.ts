// RESPONSIBILITY: Seeds deterministic development data for Admin announcements; never used in production runtime.
// FLOW: AdminCoreTenantSeeder -> AdminAnnouncementsSeeder -> TypeORM -> usage_snapshots.
import { DataSource } from 'typeorm';

import { AdminAnnouncementsEntity } from '@/backend_admin/admin_modules/admin_announcements/announcements_entities/admin-announcements-entity.js';

/**
 * @description Defines the AdminAnnouncementsSeeder boundary for the admin_announcements backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminAnnouncementsSeeder {
  /** @description Inserts deterministic, idempotent seed records when the feature table is empty. @param dataSource Tenant database source. @returns Completion promise. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(AdminAnnouncementsEntity);
    const count = await repository.count();
    if (count > 0) return;
    await repository.save([
      repository.create({ payload: {
  "title": "New strength zone",
  "body": "The new strength zone is open from Monday.",
  "priority": "HIGH",
  "status": "PUBLISHED",
  "audience": [
    "ALL_MEMBERS"
  ],
  "gymIds": [
    "00000000-0000-0000-0000-000000000101"
  ],
  "gymNames": [
    "Buildronix Central"
  ],
  "publishedAt": "2026-09-20T10:00:00Z",
  "expiresAt": "2026-10-20T10:00:00Z",
  "createdBy": "admin@example.com",
  "viewCount": 120,
  "isPinned": true,
  "deliveryStatus": "SENT",
  "pushNotificationSent": true,
  "acknowledgedCount": 82
}, name: null, status: "PUBLISHED", branchId: null } as any)
    ] as any);
  }
}
