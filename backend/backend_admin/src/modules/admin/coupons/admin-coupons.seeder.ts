// RESPONSIBILITY: Seeds deterministic development data for Admin coupons; never used in production runtime.
// FLOW: CoreTenantSeeder -> AdminCouponsSeeder -> TypeORM -> usage_snapshots.

import { DataSource } from 'typeorm';
import { AdminCouponsEntity } from '@/modules/admin/coupons/entities/admin-coupons-entity';

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
}, name: null, status: "active", branchId: null })
    ]);
  }
}
