// RESPONSIBILITY: Owns the recent progress activity read used by the Trainer Dashboard.
// FLOW: TrainerDashboardRecentProgressService → repository → progress/member query.

import { Injectable } from '@nestjs/common';
import { CoreBaseRepository } from '@/backend_trainer/backend_core/core_database/core-base.repository';
import { CoreTenantDatasourceResolver } from '@/backend_trainer/backend_core/core_database/core-tenant-datasource.resolver';
import type { DashboardRecentMemberProgress } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_types/trainer-dashboard.types';


/**
 * Intent: Defines the TrainerDashboardRecentProgressRepository boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class TrainerDashboardRecentProgressRepository extends CoreBaseRepository {
  constructor(private readonly resolver: CoreTenantDatasourceResolver) { super(); }

  /** Returns the five newest trainer-scoped member progress activities. */
  /**
 * @description Executes findRecent inside the owning backend service/repository boundary without exposing ORM details.
 * @param trainerId - Input for findRecent.
 * @returns {Promise<DashboardRecentMemberProgress[]>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findRecent(trainerId: string): Promise<DashboardRecentMemberProgress[]> {
    const rows = await (await this.resolver.getDataSource()).createQueryBuilder().select(['p.id AS id', 'm.name AS name', 'p.weight_kg AS weight', 'p.bmi AS bmi', 'p.date AS date']).from('trainer_progress_entries', 'p').innerJoin('trainer_members', 'm', 'm.id = p.member_id AND m.deleted_at IS NULL').where('p.deleted_at IS NULL AND m.assigned_trainer_id = :trainerId', { trainerId }).orderBy('p.date', 'DESC').addOrderBy('p.created_at', 'DESC').limit(5).getRawMany<{ id: string; name: string; weight: number | null; bmi: number | null; date: string }>();
    return rows.map((row) => ({ id: row.id, name: row.name, detail: row.weight === null && row.bmi === null ? 'Latest progress: No measurements recorded' : `Latest progress: ${row.weight !== null ? `${row.weight} kg` : 'weight unavailable'}${row.bmi !== null ? `, BMI ${row.bmi}` : ', BMI unavailable'}`, time: row.date }));
  }
}
