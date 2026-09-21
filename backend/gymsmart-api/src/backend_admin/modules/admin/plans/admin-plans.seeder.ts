// RESPONSIBILITY: Seeds deterministic development data for Admin plans; never used in production runtime.
// FLOW: CoreTenantSeeder -> AdminPlansSeeder -> TypeORM -> usage_snapshots.

import { DataSource } from 'typeorm';
import { AdminPlansEntity } from '@/backend_admin/modules/admin/plans/entities/admin-plans-entity';

export class AdminPlansSeeder {
  /** @description Inserts deterministic, idempotent seed records when the feature table is empty. @param dataSource Tenant database source. @returns Completion promise. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(AdminPlansEntity);
    const count = await repository.count();
    if (count > 0) return;
    await repository.save([
      repository.create({ payload: {
  "name": "Starter",
  "tier": "starter",
  "price1Month": 99900,
  "price3Month": 269700,
  "price6Month": 509400,
  "price12Month": 958800,
  "features": [
    "Access",
    "Group Classes"
  ],
  "isActive": true,
  "freezeAllowed": false,
  "joiningFee": 49900,
  "ptSessionsIncluded": 2,
  "taxRate": 18
}, name: "Starter", status: null, branchId: null }),
      repository.create({ payload: {
  "name": "Growth",
  "tier": "growth",
  "price1Month": 149900,
  "price3Month": 404700,
  "price6Month": 779400,
  "price12Month": 1438800,
  "features": [
    "Access",
    "Group Classes",
    "Diet Plan"
  ],
  "isActive": true,
  "freezeAllowed": true,
  "joiningFee": 0,
  "ptSessionsIncluded": 4,
  "taxRate": 18
}, name: "Growth", status: null, branchId: null }),
      repository.create({ payload: {
  "name": "Pro",
  "tier": "pro",
  "price1Month": 249900,
  "price3Month": 674700,
  "price6Month": 1319400,
  "price12Month": 2398800,
  "features": [
    "All Access",
    "PT",
    "Diet",
    "Recovery"
  ],
  "isActive": true,
  "freezeAllowed": true,
  "joiningFee": 0,
  "ptSessionsIncluded": 8,
  "taxRate": 18
}, name: "Pro", status: null, branchId: null })
    ]);
  }
}
