// RESPONSIBILITY: Seeds deterministic development data for Admin blacklist; never used in production runtime.
// FLOW: AdminCoreTenantSeeder -> AdminBlacklistSeeder -> TypeORM -> usage_snapshots.
import { DataSource } from 'typeorm';

import { AdminBlacklistEntity } from '@/backend_admin/admin_modules/admin_blacklist/blacklist_entities/admin-blacklist-entity'

/**
 * @description Defines the AdminBlacklistSeeder boundary for the admin_blacklist backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminBlacklistSeeder {
  /** @description Inserts deterministic, idempotent seed records when the feature table is empty. @param dataSource Tenant database source. @returns Completion promise. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(AdminBlacklistEntity);
    const count = await repository.count();
    if (count > 0) return;
    await repository.save([
      repository.create({ payload: {
  "memberId": "00000000-0000-0000-0000-000000001900",
  "name": "Sample Member",
  "phone": "9000000199",
  "email": "blocked@example.com",
  "reason": "Repeated policy violation",
  "blacklistedBy": "admin@example.com",
  "blacklistedAt": "2026-09-17T09:00:00Z",
  "scope": "specific",
  "assignedGyms": [
    "00000000-0000-0000-0000-000000000101"
  ],
  "assignedGymNames": [
    "Buildronix Central"
  ],
  "isActive": true,
  "history": []
}, name: "Sample Member", status: null, branchId: null })
    ]);
  }
}
