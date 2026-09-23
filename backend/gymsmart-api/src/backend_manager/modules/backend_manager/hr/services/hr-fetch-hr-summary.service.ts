// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { HrRepository } from '@/backend_manager/modules/backend_manager/hr/repositories/hr-repository';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class HrFetchHrSummaryService {
  constructor(private readonly repository: HrRepository) {}

  /** @description Aggregates all Manager HR summary metrics from tenant records. @param query - Validated HR filters. @returns Complete HR summary KPI object. */
  async fetchHrSummary(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findHrList({ ...query, __unbounded: true, page: 1, limit: 100 });
    const rows = result.data.map((row) => row.payload);
    const totalStaff = rows.filter((row) => row.role != null || row.staffId != null || row.name != null).length;
    const activeStaff = rows.filter((row) => (row as any).isActive === true || row.status === 'ACTIVE').length;
    const totalSalaryThisMonth = rows.reduce((sum, row) => sum + Number(row.amount ?? row.salary ?? row.netPayable ?? 0), 0);
    const totalSalaryPaid = rows.reduce((sum, row) => sum + Number(row.paidAmount ?? 0), 0);
    const totalSalaryDue = rows.reduce((sum, row) => sum + Number(row.currentDue ?? row.pendingAmount ?? 0), 0);
    const totalAdvanceGiven = rows.reduce((sum, row) => sum + Number(row.advanceSalary ?? row.advanceAmount ?? 0), 0);
    const pendingPaymentsCount = rows.filter((row) => Number(row.pendingAmount ?? row.currentDue ?? 0) > 0 || String(row.status ?? '').toUpperCase() === 'PENDING').length;
    const paidCount = rows.filter((row) => String(row.status ?? '').toUpperCase() === 'PAID').length;
    return { totalSalaryThisMonth, totalSalaryPaid, totalSalaryDue, totalAdvanceGiven, pendingPaymentsCount, totalStaff, activeStaff, totalPayrollThisMonth: totalSalaryThisMonth, paidCount };
  }
}
