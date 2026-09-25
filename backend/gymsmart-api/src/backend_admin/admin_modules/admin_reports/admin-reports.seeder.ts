// RESPONSIBILITY: Seeds deterministic development data for Admin reports; never used in production runtime.
// FLOW: AdminCoreTenantSeeder -> AdminReportsSeeder -> TypeORM -> usage_snapshots.
import { DataSource } from 'typeorm';

import { AdminReportsEntity } from '@/backend_admin/admin_modules/admin_reports/reports_entities/admin-reports-entity.js';

/**
 * @description Defines the AdminReportsSeeder boundary for the admin_reports backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminReportsSeeder {
  /** @description Inserts deterministic, idempotent seed records when the feature table is empty. @param dataSource Tenant database source. @returns Completion promise. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(AdminReportsEntity);
    const count = await repository.count();
    if (count > 0) return;
    await repository.save([
      repository.create({ payload: {
  "revenueByGym": [
    {
      "gym": "Buildronix Central",
      "revenue": 3250000
    },
    {
      "gym": "Buildronix North",
      "revenue": 2180000
    }
  ],
  "revenueByMethod": [
    {
      "method": "UPI",
      "revenue": 2200000
    },
    {
      "method": "Cash",
      "revenue": 1100000
    },
    {
      "method": "Card",
      "revenue": 1400000
    },
    {
      "method": "NetBanking",
      "revenue": 1330000
    }
  ],
  "revenueByPlan": [
    {
      "plan": "Starter",
      "revenue": 910000
    },
    {
      "plan": "Growth",
      "revenue": 3080000
    },
    {
      "plan": "Pro",
      "revenue": 2440000
    }
  ],
  "monthlyRevenue": [
    {
      "month": "Jun",
      "revenue": 1840000
    },
    {
      "month": "Jul",
      "revenue": 1930000
    },
    {
      "month": "Aug",
      "revenue": 2070000
    },
    {
      "month": "Sep",
      "revenue": 2150000
    }
  ],
  "membershipGrowth": [
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
  "attendanceSummary": [
    {
      "date": "2026-09-21",
      "present": 402,
      "late": 34,
      "absent": 18
    }
  ],
  "attendanceHeatmap": [
    {
      "day": "Mon",
      "hour": "06:00",
      "count": 98
    },
    {
      "day": "Mon",
      "hour": "07:00",
      "count": 76
    }
  ],
  "payrollSummary": {
    "monthly": 9700000,
    "paid": 8500000,
    "due": 1200000
  },
  "pnlSummary": {
    "revenue": 6430000,
    "expenses": 2010000,
    "netProfit": 4420000
  },
  "kpis": {
    "revenue": 6430000,
    "members": 830,
    "attendance": 61.3
  }
}, name: null, status: null, branchId: null })
    ]);
  }
}
