// RESPONSIBILITY: Owns read-side use cases for Admin finance; no write persistence occurs here.
// FLOW: AdminFinanceQueryController → AdminFinanceQueryService → repository → mapper → ApiResponse.

import { Injectable } from '@nestjs/common';
import { AdminFinanceRepository } from '@/modules/admin/finance/repositories/admin-finance-repository';
import { AdminFinanceMapper } from '@/modules/admin/finance/mappers/admin-finance.mapper';
import { AdminFinanceQueryDto } from '@/modules/admin/finance/dtos/admin-finance-query.dto';

@Injectable()
export class AdminFinanceQueryService {
  constructor(
    private readonly repository: AdminFinanceRepository,
    private readonly mapper: AdminFinanceMapper,
  ) {}


  /** @description Executes fetchPayments for the Admin finance feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchPayments(query: AdminFinanceQueryDto): Promise<Record<string, unknown>> {
    const snapshot = await this.repository.findFirstSnapshot(); return snapshot ? this.mapper.toResponse(this.mapper.toDomain(snapshot)) : { payments: [], total: 0 };
  }

  /** @description Executes fetchSummary for the Admin finance feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchSummary(query: AdminFinanceQueryDto): Promise<Record<string, unknown>> {
    const snapshot = await this.repository.findFirstSnapshot(); return snapshot ? (snapshot.payload.summary as Record<string, unknown> ?? {}) : {};
  }

  /** @description Executes fetchPnl for the Admin finance feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchPnl(query: AdminFinanceQueryDto): Promise<Record<string, unknown>[]> {
    const snapshot = await this.repository.findFirstSnapshot(); return snapshot ? (snapshot.payload.pnl as Record<string, unknown>[] ?? []) : [];
  }

  /** @description Executes fetchExpenses for the Admin finance feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchExpenses(query: AdminFinanceQueryDto): Promise<Record<string, unknown>> {
    const snapshot = await this.repository.findFirstSnapshot(); return snapshot ? this.mapper.toResponse(this.mapper.toDomain(snapshot)) : { expenses: [], total: 0, totalAmount: 0 };
  }
}
