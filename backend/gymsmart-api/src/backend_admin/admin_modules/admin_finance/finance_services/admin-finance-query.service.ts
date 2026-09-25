// RESPONSIBILITY: Owns read-side use cases for Admin finance; no write persistence occurs here.
// FLOW: AdminFinanceQueryController â†’ AdminFinanceQueryService â†’ repository â†’ mapper â†’ ApiResponse.
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

import { AdminFinanceQueryDto } from '@/backend_admin/admin_modules/admin_finance/finance_dtos/admin-finance-query.dto.js';
import { AdminFinancePaymentResponseDto, AdminFinanceSummaryResponseDto, AdminFinancePnlRecordDto, AdminFinanceExpenseResponseDto } from '@/backend_admin/admin_modules/admin_finance/finance_dtos/admin-finance-response.dto.js';
import { AdminFinanceResponsePresenter } from '@/backend_admin/admin_modules/admin_finance/finance_mappers/admin-finance.response.presenter.js';
import { AdminFinanceRepository } from '@/backend_admin/admin_modules/admin_finance/finance_repositories/admin-finance-repository.js';

@Injectable()
/**
 * @description Defines the AdminFinanceQueryService boundary for the admin_finance backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminFinanceQueryService {
  constructor(
    private readonly repository: AdminFinanceRepository,
    private readonly presenter: AdminFinanceResponsePresenter,
  ) {}

  /** @description Executes fetchPayments for the Admin finance feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findAllPayments(query: AdminFinanceQueryDto): Promise<AdminFinancePaymentResponseDto> {
    const snapshot = await this.repository.findLatestReadModel(query);
    if (!snapshot) throw new NotFoundException('FINANCE.READ_MODEL.NOT_FOUND');
    return this.presenter.toResponse(snapshot) as any;
  }

  /** @description Executes fetchSummary for the Admin finance feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findFinanceSummary(query: AdminFinanceQueryDto): Promise<AdminFinanceSummaryResponseDto> {
    const snapshot = await this.repository.findLatestReadModel(query); 
    if (!snapshot) throw new NotFoundException('FINANCE.READ_MODEL.NOT_FOUND');
    return this.presenter.toSummaryResponse(snapshot);
  }

  /** @description Executes fetchPnl for the Admin finance feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findPnl(query: AdminFinanceQueryDto): Promise<AdminFinancePnlRecordDto[]> {
    const snapshot = await this.repository.findLatestReadModel(query); 
    if (!snapshot) throw new NotFoundException('FINANCE.READ_MODEL.NOT_FOUND');
    return this.presenter.toPnlResponse(snapshot);
  }

  /** @description Executes fetchExpenses for the Admin finance feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findAllExpenses(query: AdminFinanceQueryDto): Promise<AdminFinanceExpenseResponseDto> {
    const snapshot = await this.repository.findLatestReadModel(query);
    if (!snapshot) throw new NotFoundException('FINANCE.READ_MODEL.NOT_FOUND');
    return this.presenter.toResponse(snapshot) as any;
  }
}
