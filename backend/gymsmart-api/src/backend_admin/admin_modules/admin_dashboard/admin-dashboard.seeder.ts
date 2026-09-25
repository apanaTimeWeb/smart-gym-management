// RESPONSIBILITY: Seeds deterministic development data for Admin dashboard; never used in production runtime.
// FLOW: AdminCoreTenantSeeder -> AdminDashboardSeeder -> TypeORM -> usage_snapshots.
import { DataSource } from 'typeorm';

import { AdminDashboardEntity } from '@/backend_admin/admin_modules/admin_dashboard/dashboard_entities/admin-dashboard-entity'

/**
 * @description Defines the AdminDashboardSeeder boundary for the admin_dashboard backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminDashboardSeeder {
  /** @description Inserts deterministic, idempotent seed records when the feature table is empty. @param dataSource Tenant database source. @returns Completion promise. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(AdminDashboardEntity);
    const count = await repository.count();
    if (count > 0) return;
    await repository.save([
      repository.create({ payload: {
  "totalMembers": 830,
  "activeMembers": 724,
  "newMembersThisMonth": 54,
  "totalRevenue": 6430000,
  "currency": "INR",
  "monthlyRevenue": 2150000,
  "netProfit": 4420000,
  "totalExpenses": 2010000,
  "pendingPayments": 410000,
  "totalStaff": 37,
  "activeStaff": 34,
  "totalProducts": 112,
  "lowStockCount": 8,
  "totalInquiries": 94,
  "newInquiries": 11,
  "cancellationRate": 2.9,
  "retentionRate": 89.4,
  "arpm": 259036,
  "memberGrowth": [
    {
      "month": "Jun",
      "count": 780
    },
    {
      "month": "Jul",
      "count": 796
    },
    {
      "month": "Aug",
      "count": 810
    },
    {
      "month": "Sep",
      "count": 830
    }
  ],
  "revenueTrend": [
    {
      "month": "Jun",
      "revenue": 1840000,
      "profit": 1170000,
      "currency": "INR"
    },
    {
      "month": "Jul",
      "revenue": 1930000,
      "profit": 1260000,
      "currency": "INR"
    },
    {
      "month": "Aug",
      "revenue": 2070000,
      "profit": 1390000,
      "currency": "INR"
    },
    {
      "month": "Sep",
      "revenue": 2150000,
      "profit": 1570000,
      "currency": "INR"
    }
  ],
  "membersByPlan": [
    {
      "plan": "Starter",
      "count": 290
    },
    {
      "plan": "Growth",
      "count": 351
    },
    {
      "plan": "Pro",
      "count": 142
    },
    {
      "plan": "Enterprise",
      "count": 41
    }
  ],
  "membersByStatus": {
    "active": 724,
    "pending": 37,
    "expired": 51,
    "frozen": 18
  },
  "branchLeaderboard": [
    {
      "id": "00000000-0000-0000-0000-000000000101",
      "name": "Buildronix Central",
      "revenue": 3250000,
      "activeMembers": 401,
      "currency": "INR",
      "trend": "up"
    },
    {
      "id": "00000000-0000-0000-0000-000000000102",
      "name": "Buildronix North",
      "revenue": 2180000,
      "activeMembers": 267,
      "currency": "INR",
      "trend": "up"
    }
  ],
  "systemAlerts": [
    {
      "id": "alert-01",
      "message": "8 low-stock products need attention.",
      "severity": "high",
      "date": "2026-09-21T07:15:00Z"
    }
  ],
  "todayAttendance": 402,
  "expiringThisWeek": 14,
  "totalInquiriesOpen": 19,
  "avgAttendance": 61.3,
  "renewalsPending": 22,
  "attendanceTrend": [
    {
      "date": "2026-09-15",
      "count": 371
    },
    {
      "date": "2026-09-16",
      "count": 390
    },
    {
      "date": "2026-09-17",
      "count": 384
    },
    {
      "date": "2026-09-18",
      "count": 401
    },
    {
      "date": "2026-09-19",
      "count": 420
    },
    {
      "date": "2026-09-20",
      "count": 398
    },
    {
      "date": "2026-09-21",
      "count": 402
    }
  ]
}, name: null, status: null, branchId: null })
    ]);
  }
}
