// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { FinanceRepository } from '@/backend_manager/manager_modules/finance/manager-finance.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

export interface ManagerFinanceFindFinanceSummaryServiceFindFinanceSummaryResult {
  totalRevenue: unknown;
  monthlyRevenue: number;
  pendingAmount: unknown;
  gstCollected: unknown;
  monthlyData: unknown;
}

@Injectable()
export class ManagerFinanceFindFinanceSummaryService {
  constructor(private readonly repository: FinanceRepository) {}

  /** @description Aggregates finance KPIs and preserves persisted monthly chart data when available. @param query - Validated finance filters. @returns Complete finance summary contract. */
  async findFinanceSummary(query: ManagerCoreJsonObject = {}): Promise<ManagerFinanceFindFinanceSummaryServiceFindFinanceSummaryResult> {
    const result = await this.repository.findAll({ ...query, __unbounded: true, page: 1, limit: 100 });
    const rows = result.data.map((row: any) => row.payload);
    const persisted = rows.find((row) => Array.isArray(row.monthlyData));
    const totalRevenue = rows.reduce((sum, row) => sum + Number(row.amount ?? (row).totalRevenue ?? 0), 0);
    const pendingAmount = rows.filter((row) => String(row.status ?? '').toUpperCase() === 'PENDING').reduce((sum, row) => sum + Number(row.amount ?? 0), 0);
    const gstCollected = rows.reduce((sum, row) => sum + Number(row.gstAmount ?? 0), 0);
    const month = new Date().toISOString().slice(0, 7);
    const monthlyRevenue = rows.filter((row) => String(row.paidAt ?? row.date ?? '').slice(0, 7) === month).reduce((sum, row) => sum + Number(row.amount ?? 0), 0);
    const monthlyData = Array.isArray(persisted?.monthlyData) ? persisted.monthlyData : [];
    return { totalRevenue, monthlyRevenue, pendingAmount, gstCollected, monthlyData };
  }
}

export { ManagerFinanceFindFinanceSummaryService as FinanceFindFinanceSummaryService };
