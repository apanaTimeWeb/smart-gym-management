// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { FinanceRepository } from '@/backend_manager/modules/backend_manager/finance/repositories/finance-repository';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class FinanceFetchFinanceSummaryService {
  constructor(private readonly repository: FinanceRepository) {}

  /** @description Aggregates finance KPIs and preserves persisted monthly chart data when available. @param query - Validated finance filters. @returns Complete finance summary contract. */
  async fetchFinanceSummary(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findFinanceList({ ...query, __unbounded: true, page: 1, limit: 100 });
    const rows = result.data.map((row) => row.payload);
    const persisted = rows.find((row) => Array.isArray(row.monthlyData));
    const totalRevenue = rows.reduce((sum, row) => sum + Number(row.amount ?? (row as any).totalRevenue ?? 0), 0);
    const pendingAmount = rows.filter((row) => String(row.status ?? '').toUpperCase() === 'PENDING').reduce((sum, row) => sum + Number(row.amount ?? 0), 0);
    const gstCollected = rows.reduce((sum, row) => sum + Number(row.gstAmount ?? 0), 0);
    const month = new Date().toISOString().slice(0, 7);
    const monthlyRevenue = rows.filter((row) => String(row.paidAt ?? row.date ?? '').slice(0, 7) === month).reduce((sum, row) => sum + Number(row.amount ?? 0), 0);
    const monthlyData = Array.isArray(persisted?.monthlyData) ? persisted.monthlyData : [];
    return { totalRevenue, monthlyRevenue, pendingAmount, gstCollected, monthlyData };
  }
}
