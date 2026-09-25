// RESPONSIBILITY: Seeds deterministic development data for Admin coupons; never used in production runtime.
// FLOW: AdminCoreTenantSeeder -> AdminCouponsSeeder -> TypeORM -> usage_snapshots.
import { DataSource } from 'typeorm';

import { AdminCouponsEntity } from '@/backend_admin/admin_modules/admin_coupons/coupons_entities/admin-coupons-entity'

/**
 * @description Defines the AdminCouponsSeeder boundary for the admin_coupons backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCouponsSeeder {
  /** @description Inserts deterministic, idempotent seed records when the feature table is empty. @param dataSource Tenant database source. @returns Completion promise. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(AdminCouponsEntity);
    const count = await repository.count();
    if (count > 0) return;
    await repository.save([
      repository.create({ payload: {
  "code": "WELCOME20",
  "description": "Welcome discount",
  "type": "percentage",
  "value": 20,
  "minOrderAmount": 99900,
  "maxDiscount": 20000,
  "usageLimit": 1000,
  "usedCount": 118,
  "assignedGyms": [
    "00000000-0000-0000-0000-000000000101"
  ],
  "assignedGymNames": [
    "Buildronix Central"
  ],
  "validFrom": "2026-09-01T00:00:00Z",
  "validUntil": "2026-12-31T23:59:59Z",
  "status": "active"
}, name: null, status: "ACTIVE", branchId: null } as any)
    ] as any);
  }
}
