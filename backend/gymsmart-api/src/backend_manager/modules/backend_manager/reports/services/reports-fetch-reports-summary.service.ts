// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { ReportsRepository } from '@/backend_manager/modules/backend_manager/reports/repositories/reports-repository';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class ReportsFetchReportsSummaryService {
  constructor(private readonly repository: ReportsRepository) {}

  /** @description Loads the complete persisted reports summary. @param query - Validated report filters. @returns Complete reports summary contract. */
  async fetchReportsSummary(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findReportsList({ ...query, page: 1, limit: 1 });
    const payload = result.data[0]?.payload ?? {};
    return {
      kpis: (payload.kpis as CoreJsonObject) ?? { totalRevenue: 0, totalMembers: 0, avgAttendanceRate: 0, totalExpenses: 0, netProfit: 0, newMembersThisMonth: 0, churnRate: 0, activeMembers: 0 },
      revenueData: Array.isArray(payload.revenueData) ? payload.revenueData : [],
      attendanceData: Array.isArray(payload.attendanceData) ? payload.attendanceData : [],
      memberChurnData: Array.isArray(payload.memberChurnData) ? payload.memberChurnData : [],
      expenseBreakdown: Array.isArray(payload.expenseBreakdown) ? payload.expenseBreakdown : [],
    };
  }
}
