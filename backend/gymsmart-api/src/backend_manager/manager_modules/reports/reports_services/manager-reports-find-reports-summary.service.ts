// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { ReportsRepository } from '@/backend_manager/manager_modules/reports/manager-reports.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

export interface ManagerReportsFindReportsSummaryServiceFindReportsSummaryResult {
  kpis: ManagerCoreJsonObject;
  revenueData: Array<ManagerCoreJsonObject>;
  attendanceData: Array<ManagerCoreJsonObject>;
  memberChurnData: Array<ManagerCoreJsonObject>;
  expenseBreakdown: Array<ManagerCoreJsonObject>;
}

@Injectable()
export class ManagerReportsFindReportsSummaryService {
  constructor(private readonly repository: ReportsRepository) {}

  /** @description Loads the complete persisted reports summary. @param query - Validated report filters. @returns Complete reports summary contract. */
  async findReportsSummary(query: ManagerCoreJsonObject = {}): Promise<ManagerReportsFindReportsSummaryServiceFindReportsSummaryResult> {
    const result = await this.repository.findAll({ ...query, page: 1, limit: 1 });
    const payload = result.data[0]?.payload ?? {};
    return {
      kpis: (payload.kpis as ManagerCoreJsonObject) ?? { totalRevenue: 0, totalMembers: 0, avgAttendanceRate: 0, totalExpenses: 0, netProfit: 0, newMembersThisMonth: 0, churnRate: 0, activeMembers: 0 },
      revenueData: Array.isArray(payload.revenueData) ? payload.revenueData.map((item) => ({ ...(item as ManagerCoreJsonObject), currency: typeof (item as ManagerCoreJsonObject).currency === 'string' ? String((item as ManagerCoreJsonObject).currency) : String(payload.currency ?? 'INR') })) : [],
      attendanceData: Array.isArray(payload.attendanceData) ? payload.attendanceData.map((item) => ({ ...(item as ManagerCoreJsonObject) })) : [],
      memberChurnData: Array.isArray(payload.memberChurnData) ? payload.memberChurnData.map((item) => ({ ...(item as ManagerCoreJsonObject) })) : [],
      expenseBreakdown: Array.isArray(payload.expenseBreakdown) ? payload.expenseBreakdown.map((item) => ({ ...(item as ManagerCoreJsonObject), currency: typeof (item as ManagerCoreJsonObject).currency === 'string' ? String((item as ManagerCoreJsonObject).currency) : String(payload.currency ?? 'INR') })) : [],
    };
  }
}

export { ManagerReportsFindReportsSummaryService as ReportsFindReportsSummaryService };
