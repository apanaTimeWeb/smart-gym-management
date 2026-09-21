// RESPONSIBILITY: Seeds deterministic development data for Admin finance; never used in production runtime.
// FLOW: CoreTenantSeeder -> AdminFinanceSeeder -> TypeORM -> usage_snapshots.

import { DataSource } from 'typeorm';
import { AdminFinanceEntity } from '@/backend_admin/modules/admin/finance/entities/admin-finance-entity';

export class AdminFinanceSeeder {
  /** @description Inserts deterministic, idempotent seed records when the feature table is empty. @param dataSource Tenant database source. @returns Completion promise. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(AdminFinanceEntity);
    const count = await repository.count();
    if (count > 0) return;
    await repository.save([
      repository.create({ payload: {
  "summary": {
    "totalRevenue": 6430000,
    "monthlyRevenue": 2150000,
    "pendingAmount": 410000,
    "totalPayments": 520,
    "totalExpenses": 2010000,
    "netProfit": 4420000,
    "revenueByMethod": {
      "UPI": 2200000,
      "Cash": 1100000,
      "Card": 1400000,
      "NetBanking": 1330000
    }
  },
  "pnl": [
    {
      "branchName": "Buildronix Central",
      "revenue": 3250000,
      "expenses": 1120000,
      "netProfit": 2130000,
      "marginPct": 65.5,
      "status": "healthy",
      "momDelta": 8.2
    }
  ],
  "payments": [
    {
      "id": "pay-1001",
      "memberId": "00000000-0000-0000-0000-000000001001",
      "amount": 149900,
      "method": "UPI",
      "paymentMode": "UPI",
      "gstAmount": 22865,
      "taxRate": 18,
      "invoiceNumber": "INV-1001",
      "planId": "00000000-0000-0000-0000-000000002002",
      "type": "PAYMENT",
      "status": "paid",
      "paidAt": "2026-09-20T10:00:00Z",
      "invoiceNo": "INV-1001",
      "receiptNumber": "R-1001",
      "discountApplied": 0,
      "couponCode": ""
    }
  ],
  "expenses": [
    {
      "id": "exp-1001",
      "amount": 550000,
      "category": "RENT",
      "branchId": "00000000-0000-0000-0000-000000000101",
      "date": "2026-09-01T00:00:00Z",
      "notes": "Monthly rent",
      "recordedBy": "admin@example.com",
      "vendor": "Landlord",
      "billNumber": "B-009",
      "receiptUrl": ""
    }
  ]
}, name: null, status: null, branchId: null })
    ]);
  }
}
