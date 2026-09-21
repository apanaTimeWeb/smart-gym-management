// RESPONSIBILITY: Owns read-side use cases for Admin finance; no write persistence occurs here.
// FLOW: AdminFinanceQueryController â†’ AdminFinanceQueryService â†’ repository â†’ mapper â†’ ApiResponse.

import { Injectable } from '@nestjs/common';
import { AdminFinanceRepository } from '@/backend_admin/modules/admin/finance/repositories/admin-finance-repository';
import { AdminFinanceMapper } from '@/backend_admin/modules/admin/finance/mappers/admin-finance.mapper';
import { AdminFinanceQueryDto } from '@/backend_admin/modules/admin/finance/dtos/admin-finance-query.dto';
import { AdminFinancePaymentResponseDto, AdminFinanceSummaryResponseDto, AdminFinancePnlRecordDto, AdminFinanceExpenseResponseDto } from '@/backend_admin/modules/admin/finance/dtos/admin-finance-response.dto';

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
  async fetchPayments(query: AdminFinanceQueryDto): Promise<AdminFinancePaymentResponseDto> {
    const snapshot = await this.repository.findFirstSnapshot(); 
    return snapshot ? (this.mapper.toResponse(this.mapper.toDomain(snapshot)) as unknown as AdminFinancePaymentResponseDto) : { payments: [], total: 0 };
  }

  /** @description Executes fetchSummary for the Admin finance feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchSummary(query: AdminFinanceQueryDto): Promise<AdminFinanceSummaryResponseDto> {
    const snapshot = await this.repository.findFirstSnapshot(); 
    return snapshot ? ((snapshot.payload.summary as any) ?? {}) as unknown as AdminFinanceSummaryResponseDto : {} as unknown as AdminFinanceSummaryResponseDto;
  }

  /** @description Executes fetchPnl for the Admin finance feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchPnl(query: AdminFinanceQueryDto): Promise<AdminFinancePnlRecordDto[]> {
    const snapshot = await this.repository.findFirstSnapshot(); 
    return snapshot ? ((snapshot.payload.pnl as any) ?? []) as unknown as AdminFinancePnlRecordDto[] : [];
  }

  /** @description Executes fetchExpenses for the Admin finance feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchExpenses(query: AdminFinanceQueryDto): Promise<AdminFinanceExpenseResponseDto> {
    const snapshot = await this.repository.findFirstSnapshot(); 
    return snapshot ? (this.mapper.toResponse(this.mapper.toDomain(snapshot)) as unknown as AdminFinanceExpenseResponseDto) : { expenses: [], total: 0, totalAmount: 0 };
  }
}
