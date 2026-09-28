// RESPONSIBILITY: Owns Trainer Dashboard goal-completion trend aggregation for the selected reporting range.
// FLOW: TrainerDashboardTrendService → TrainerDashboardTrendRepository → progress/member aggregates.

import { Injectable } from '@nestjs/common';
import { CoreBaseRepository } from '@/backend_trainer/backend_core/core_database/core-base.repository';
import { CoreTenantDatasourceResolver } from '@/backend_trainer/backend_core/core_database/core-tenant-datasource.resolver';
import type { DashboardTrendPoint } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_types/trainer-dashboard.types';


/**
 * Intent: Defines the TrainerDashboardTrendRepository boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class TrainerDashboardTrendRepository extends CoreBaseRepository {
  constructor(private readonly resolver: CoreTenantDatasourceResolver) { super(); }

  /** Returns monthly goal-completion trend points for the selected trainer-scoped date range. */
  /**
 * @description Executes findByRange inside the owning backend service/repository boundary without exposing ORM details.
 * @param trainerId - Input for findByRange.
 * @param startDate - Input for findByRange.
 * @param endDate - Input for findByRange.
 * @returns {Promise<DashboardTrendPoint[]>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findByRange(trainerId: string, startDate: string, endDate: string): Promise<DashboardTrendPoint[]> {
    const rows = await (await this.resolver.getDataSource()).createQueryBuilder().select("TO_CHAR(DATE_TRUNC('month', p.date), 'Mon YYYY')", 'month').addSelect("ROUND(AVG(CASE WHEN m.progress_status = 'GOOD' THEN 100 ELSE 0 END))", 'rate').from('trainer_progress_entries', 'p').innerJoin('trainer_members', 'm', 'm.id = p.member_id AND m.deleted_at IS NULL').where('p.deleted_at IS NULL AND m.assigned_trainer_id = :trainerId AND p.date BETWEEN :startDate AND :endDate', { trainerId, startDate, endDate }).groupBy("DATE_TRUNC('month', p.date)").orderBy("DATE_TRUNC('month', p.date)", 'DESC').limit(6).getRawMany<{ month: string; rate: string }>();
    return rows.reverse().map((row) => ({ month: row.month, rate: Number(row.rate) }));
  }
}
