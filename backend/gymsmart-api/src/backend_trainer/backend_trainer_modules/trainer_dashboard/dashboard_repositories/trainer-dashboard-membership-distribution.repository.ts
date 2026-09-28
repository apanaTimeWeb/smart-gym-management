// RESPONSIBILITY: Owns assigned-member membership-plan distribution for the Trainer Dashboard.
// FLOW: TrainerDashboardMembershipDistributionService → repository → tenant member aggregate.

import { Injectable } from '@nestjs/common';
import { CoreBaseRepository } from '@/backend_trainer/backend_core/core_database/core-base.repository';
import { CoreTenantDatasourceResolver } from '@/backend_trainer/backend_core/core_database/core-tenant-datasource.resolver';
import type { DashboardPlanDistribution } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_types/trainer-dashboard.types';


/**
 * Intent: Defines the TrainerDashboardMembershipDistributionRepository boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class TrainerDashboardMembershipDistributionRepository extends CoreBaseRepository {
  constructor(private readonly resolver: CoreTenantDatasourceResolver) { super(); }

  /** Returns current assigned-member distribution grouped by plan. */
  /**
 * @description Executes findForTrainer inside the owning backend service/repository boundary without exposing ORM details.
 * @param trainerId - Input for findForTrainer.
 * @returns {Promise<DashboardPlanDistribution[]>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findForTrainer(trainerId: string): Promise<DashboardPlanDistribution[]> {
    const rows = await (await this.resolver.getDataSource()).createQueryBuilder().select("COALESCE(m.plan_name, 'Unknown')", 'plan').addSelect('COUNT(1)', 'count').from('trainer_members', 'm').where('m.deleted_at IS NULL AND m.assigned_trainer_id = :trainerId', { trainerId }).groupBy('m.plan_name').orderBy('count', 'DESC').getRawMany<{ plan: string; count: string }>();
    return rows.map((row) => ({ plan: row.plan, count: Number(row.count) }));
  }
}
