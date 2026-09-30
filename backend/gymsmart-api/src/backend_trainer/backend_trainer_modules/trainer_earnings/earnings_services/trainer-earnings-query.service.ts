// RESPONSIBILITY: Builds Trainer earnings read contracts from repository-owned data.
// FLOW: Earnings query controller → use-case service → repository → typed response DTO shape.
import { Injectable } from '@nestjs/common';
import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';
import { CoreConfigService } from '@/backend_trainer/backend_core/core_config/core-config.service';
import { buildCorePaginationMeta } from '@/backend_trainer/backend_core/core_utils/core-pagination.utils';
import { TrainerEarningsRepository } from '@/backend_trainer/backend_trainer_modules/trainer_earnings/earnings_repositories/trainer-earnings-repository';
import { TrainerEarningsEnumMapper } from '@/backend_trainer/backend_trainer_modules/trainer_earnings/trainer-earnings-enum.mapper';
import type { TrainerEarningsHistoryResult, TrainerEarningsKpiResult, TrainerEarningsPendingPayoutResult, TrainerEarningsQueryInput, TrainerEarningsOverviewResult, TrainerEarningsHistoryPageResult } from '@/backend_trainer/backend_trainer_modules/trainer_earnings/earnings_types/trainer-earnings-query.types';
/**
 * Intent: Defines the TrainerEarningsQueryService boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class TrainerEarningsQueryService {
  constructor(private readonly repository: TrainerEarningsRepository, private readonly config: CoreConfigService) {}
  /**
   * Intent: Returns the complete earnings page contract without rebuilding history or payout data in the controller.
   * Edge Cases: Empty payouts/history must retain canonical empty arrays and pagination metadata.
   * Side Effects: Read-only repository calls only.
   * AI Note: Keep KPI totals server-derived and independent of the current history page.
   */
  /**
 * @description Executes findAll inside the owning backend service/repository boundary without exposing ORM details.
 * @param query - Input for findAll.
 * @returns {Promise<TrainerEarningsOverviewResult>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findAll(query: TrainerEarningsQueryInput): Promise<TrainerEarningsOverviewResult> {
    const pendingPayouts = await this.findPendingPayouts();
    const kpis = await this.findKpis(query, pendingPayouts);
    const history = await this.findHistory(query);
    return { kpis, pendingPayouts, ...history, historyPage: query.page, historyLimit: query.limit };
  }
  /**
   * Intent: Computes Trainer earnings KPIs from repository aggregates and authoritative currency configuration.
   * Edge Cases: Pending payouts are reused when already loaded to avoid redundant queries.
   * Side Effects: Read-only.
   * AI Note: Never hardcode a currency code in this service.
   */
  /**
 * @description Executes findKpis inside the owning backend service/repository boundary without exposing ORM details.
 * @param query - Input for findKpis.
 * @param pendingPayouts - Input for findKpis.
 * @returns {Promise<TrainerEarningsKpiResult>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findKpis(query: TrainerEarningsQueryInput, pendingPayouts?: TrainerEarningsPendingPayoutResult[]): Promise<TrainerEarningsKpiResult> {
    const trainerId = this.getTrainerId();
    const totals = await this.repository.findTotals(trainerId, query.startDate, query.endDate);
    const payouts = pendingPayouts ?? (await this.repository.findPending(trainerId));
    const compensation = await this.repository.findCompensation(trainerId);
    const sessionsCompleted = await this.repository.countCompletedSessions(trainerId, query.startDate, query.endDate);
    return this.buildKpiResult(totals, payouts, compensation, sessionsCompleted, this.config.getDefaultCurrencyCode());
  }
  /**
   * Intent: Resolves the authenticated Trainer identifier from trusted request context.
   * Edge Cases: Missing identity must raise the canonical authentication exception.
   * AI Note: Never accept trainerId from request body/query for authorization.
   */
  /**
 * @description Executes getTrainerId inside the owning backend service/repository boundary without exposing ORM details.
 * @returns {string} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
private getTrainerId(): string { return CoreRequestContext.getUserIdOrThrow(); }
  /**
   * Intent: Converts persistence-layer money values into the frozen earnings KPI shape.
   * Edge Cases: Numeric database strings are converted explicitly; optional bank data is omitted when null.
   * AI Note: Currency comes from authoritative configuration, not from UI input.
   */
  /**
 * @description Executes buildKpiResult inside the owning backend service/repository boundary without exposing ORM details.
 * @param totals - Input for buildKpiResult.
 * @param payouts - Input for buildKpiResult.
 * @param compensation - Input for buildKpiResult.
 * @param sessionsCompleted - Input for buildKpiResult.
 * @param currency - Input for buildKpiResult.
 * @returns {TrainerEarningsKpiResult} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
private buildKpiResult(totals: { totalEarnings: string | number; taxDeduction: string | number }, payouts: Array<{ amountMinor?: string | number; amount?: string | number }>, compensation: { commissionRate: string | number; bankAccount: string | null; commissionTier: string }, sessionsCompleted: number, currency: string): TrainerEarningsKpiResult {
    return { totalEarnings: Number(totals.totalEarnings), pendingPayouts: payouts.reduce((sum, row) => sum + Number(row.amountMinor ?? row.amount ?? 0), 0), sessionsCompleted, commissionRate: Number(compensation.commissionRate), taxDeduction: Number(totals.taxDeduction), ...(compensation.bankAccount !== null ? { bankAccount: compensation.bankAccount } : {}), commissionTier: compensation.commissionTier, currency };
  }
  /**
   * Intent: Returns pending payout rows for the authenticated Trainer.
   * Edge Cases: Empty results remain empty; currency is applied uniformly from configuration.
   * AI Note: Do not expose persistence amountMinor as a public API money field.
   */
  /**
 * @description Executes findPendingPayouts inside the owning backend service/repository boundary without exposing ORM details.
 * @returns {Promise<TrainerEarningsPendingPayoutResult[]>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findPendingPayouts(): Promise<TrainerEarningsPendingPayoutResult[]> {
    const currency = this.config.getDefaultCurrencyCode();
    const payouts = await this.repository.findPending(this.getTrainerId());
    return payouts.map((row) => ({ id: row.id, period: row.period, amount: Number(row.amountMinor), status: TrainerEarningsEnumMapper.toApiStatus(row.status), dueDate: row.dueDate, currency }));
  }
  /**
   * Intent: Returns paginated earnings history using repository-owned filtering and totals.
   * Edge Cases: Empty history must still return canonical pagination metadata.
   * AI Note: Mapping belongs here; controllers must not see ORM/persistence rows.
   */
  /**
 * @description Executes findHistory inside the owning backend service/repository boundary without exposing ORM details.
 * @param query - Input for findHistory.
 * @returns {Promise<TrainerEarningsHistoryPageResult>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findHistory(query: TrainerEarningsQueryInput): Promise<TrainerEarningsHistoryPageResult> {
    const result = await this.repository.findHistory(this.getTrainerId(), query);
    return { history: this.mapHistory(result.rows), historyTotal: result.total, pagination: buildCorePaginationMeta(result.total, query.page, query.limit) };
  }
  /**
   * Intent: Converts repository history rows to the frozen public response contract.
   * Edge Cases: Nullable optional fields remain omitted; database minor units are converted to API numbers.
   * AI Note: Preserve exact UI field names and authoritative configured currency.
   */
  /**
 * @description Executes mapHistory inside the owning backend service/repository boundary without exposing ORM details.
 * @param rows - Input for mapHistory.
 * @returns {TrainerEarningsHistoryResult[]} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
private mapHistory(rows: Awaited<ReturnType<TrainerEarningsRepository['findHistory']>>['rows']): TrainerEarningsHistoryResult[] {
    const currency = this.config.getDefaultCurrencyCode();
    return rows.map((row) => ({ id: row.id, date: row.eventDate, type: TrainerEarningsEnumMapper.toApiHistoryType(row.type), description: row.description, amount: Number(row.amountMinor), status: TrainerEarningsEnumMapper.toApiStatus(row.status), ...(row.sessionId !== null ? { sessionId: row.sessionId } : {}), ...(row.tdsDeductedMinor !== null ? { tdsDeducted: Number(row.tdsDeductedMinor) } : {}), ...(row.netPayoutMinor !== null ? { netPayout: Number(row.netPayoutMinor) } : {}), ...(row.invoiceNumber !== null ? { invoiceNumber: row.invoiceNumber } : {}), currency }));
  }
}
