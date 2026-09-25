// RESPONSIBILITY: Seeds deterministic development data for Admin payouts; never used in production runtime.
// FLOW: AdminCoreTenantSeeder -> AdminPayoutsSeeder -> TypeORM -> usage_snapshots.
import { DataSource } from 'typeorm';

import { AdminPayoutsEntity } from '@/backend_admin/admin_modules/admin_payouts/payouts_entities/admin-payouts-entity'

/**
 * @description Defines the AdminPayoutsSeeder boundary for the admin_payouts backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminPayoutsSeeder {
  /** @description Inserts deterministic, idempotent seed records when the feature table is empty. @param dataSource Tenant database source. @returns Completion promise. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(AdminPayoutsEntity);
    const count = await repository.count();
    if (count > 0) return;
    await repository.save([
      repository.create({ payload: {
  "payouts": [
    {
      "gymId": "00000000-0000-0000-0000-000000000101",
      "gymName": "Buildronix Central",
      "month": "2026-09",
      "grossRevenue": 3250000,
      "staffPayroll": 870000,
      "operationalExpenses": 250000,
      "platformFee": 195000,
      "netProfit": 1935000,
      "payoutStatus": "paid",
      "paidOn": "2026-09-20T10:00:00Z",
      "approvedBy": "admin@example.com"
    }
  ],
  "pnl": [
    {
      "gymId": "00000000-0000-0000-0000-000000000101",
      "gymName": "Buildronix Central",
      "month": "2026-09",
      "revenue": 3250000,
      "cogs": 420000,
      "grossProfit": 2830000,
      "staffCost": 870000,
      "rentUtilities": 180000,
      "marketing": 70000,
      "miscExpenses": 50000,
      "ebitda": 1660000,
      "tax": 298800,
      "netProfit": 1361200
    }
  ],
  "kpis": {
    "totalNetProfit": 3298400,
    "totalGrossRevenue": 6430000,
    "totalExpenses": 3131600,
    "pendingPayouts": 1
  }
}, name: null, status: null, branchId: null })
    ]);
  }
}
