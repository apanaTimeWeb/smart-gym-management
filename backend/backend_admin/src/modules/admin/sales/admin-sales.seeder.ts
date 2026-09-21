// RESPONSIBILITY: Seeds deterministic development data for Admin sales; never used in production runtime.
// FLOW: CoreTenantSeeder -> AdminSalesSeeder -> TypeORM -> usage_snapshots.

import { DataSource } from 'typeorm';
import { AdminSalesEntity } from '@/modules/admin/sales/entities/admin-sales-entity';

export class AdminSalesSeeder {
  /** @description Inserts deterministic, idempotent seed records when the feature table is empty. @param dataSource Tenant database source. @returns Completion promise. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(AdminSalesEntity);
    const count = await repository.count();
    if (count > 0) return;
    await repository.save([
      repository.create({ payload: {
  "monthlyRevenue": [
    {
      "date": "2026-09-01",
      "revenue": 430000,
      "newMembers": 12
    },
    {
      "date": "2026-09-02",
      "revenue": 210000,
      "newMembers": 6
    }
  ],
  "referralData": [
    {
      "source": "Instagram",
      "revenue": 580000
    },
    {
      "source": "Referral",
      "revenue": 910000
    },
    {
      "source": "Website",
      "revenue": 640000
    }
  ],
  "report": [
    {
      "id": 1,
      "name": "Growth",
      "totalMembers": 351,
      "activeMembers": 325,
      "revenue": 3080000,
      "plan": "Growth",
      "receivable": 3380000,
      "received": 3080000,
      "remaining": 300000,
      "refund": 0,
      "referralSource": "Referral",
      "couponCode": "WELCOME20",
      "renewalCount": 88
    }
  ],
  "totals": {
    "activeCount": 724,
    "revenue": 6430000,
    "totalReceivable": 6840000,
    "totalReceived": 6430000,
    "remaining": 410000,
    "refunds": 25000
  },
  "members": [
    {
      "id": "00000000-0000-0000-0000-000000001002",
      "name": "Neha Singh",
      "email": "neha@example.com",
      "phone": "9000000002",
      "gender": "Female",
      "branch": "Buildronix Central",
      "planId": "00000000-0000-0000-0000-000000002001",
      "billingCycle": "monthly",
      "status": "pending",
      "joinDate": "2026-09-05T00:00:00Z",
      "expiryDate": "2026-10-04T00:00:00Z",
      "paidAmount": 50000,
      "pendingAmount": 150000,
      "createdAt": "2026-09-05T00:00:00Z"
    }
  ],
  "orders": [
    {
      "id": "ORD-001",
      "total": 45000,
      "method": "UPI",
      "status": "paid",
      "createdAt": "2026-09-20T12:00:00Z",
      "items": [
        {
          "id": "IT-001",
          "qty": 1,
          "price": 45000,
          "product": {
            "name": "Whey Protein"
          }
        }
      ]
    }
  ],
  "storeSummary": {
    "totalProducts": 112,
    "totalOrders": 520,
    "totalRevenue": 1890000,
    "lowStockProducts": [
      {
        "id": "PR-1",
        "name": "Whey Protein",
        "category": "SUPPLEMENT",
        "price": 45000,
        "stock": 6,
        "isActive": true
      }
    ]
  }
}, name: null, status: null, branchId: null })
    ]);
  }
}
