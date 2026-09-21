// RESPONSIBILITY: Seeds deterministic development data for Admin subscriptions; never used in production runtime.
// FLOW: CoreTenantSeeder -> AdminSubscriptionsSeeder -> TypeORM -> usage_snapshots.

import { DataSource } from 'typeorm';
import { AdminSubscriptionsEntity } from '@/backend_admin/modules/admin/subscriptions/entities/admin-subscriptions-entity';

export class AdminSubscriptionsSeeder {
  /** @description Inserts deterministic, idempotent seed records when the feature table is empty. @param dataSource Tenant database source. @returns Completion promise. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(AdminSubscriptionsEntity);
    const count = await repository.count();
    if (count > 0) return;
    await repository.save([
      repository.create({ payload: {
  "subscription": {
    "planId": "00000000-0000-0000-0000-000000002002",
    "planName": "Growth",
    "tier": "growth",
    "monthlyPrice": 149900,
    "annualPrice": 1438800,
    "billingCycle": "annual",
    "status": "active",
    "currentPeriodStart": "2026-09-01T00:00:00Z",
    "currentPeriodEnd": "2027-08-31T23:59:59Z",
    "nextBillingDate": "2027-09-01T00:00:00Z",
    "autoRenew": true,
    "gymCount": 3,
    "memberLimit": 1000,
    "staffLimit": 50,
    "storageGb": 100
  },
  "plans": [
    {
      "id": "00000000-0000-0000-0000-000000002001",
      "name": "Starter",
      "tier": "starter",
      "monthlyPrice": 99900,
      "annualPrice": 958800,
      "gymLimit": 1,
      "memberLimit": 300,
      "staffLimit": 15,
      "storageGb": 25,
      "features": [
        "Core"
      ],
      "isPopular": false,
      "isCurrent": false
    },
    {
      "id": "00000000-0000-0000-0000-000000002002",
      "name": "Growth",
      "tier": "growth",
      "monthlyPrice": 149900,
      "annualPrice": 1438800,
      "gymLimit": 3,
      "memberLimit": 1000,
      "staffLimit": 50,
      "storageGb": 100,
      "features": [
        "Analytics",
        "Reports"
      ],
      "isPopular": true,
      "isCurrent": true
    }
  ],
  "invoices": [
    {
      "id": "INV-SUB-001",
      "invoiceNo": "SUB-2026-09",
      "date": "2026-09-01",
      "dueDate": "2026-09-01",
      "amount": 1438800,
      "status": "paid",
      "planName": "Growth",
      "billingCycle": "annual",
      "pdfUrl": "/admin/subscriptions/invoices/SUB-2026-09.pdf",
      "taxAmount": 219478,
      "gstNumber": "10ABCDE1234F1Z5"
    }
  ],
  "paymentMethods": [
    {
      "id": "PM-001",
      "type": "upi",
      "upiId": "buildronix@upi",
      "isDefault": true
    }
  ],
  "kpi": {
    "currentPlan": "Growth",
    "monthlySpend": 119900,
    "totalInvoices": 12,
    "nextBillingAmount": 1438800,
    "daysUntilRenewal": 344,
    "savedWithAnnual": 95400
  }
}, name: null, status: null, branchId: null })
    ]);
  }
}
