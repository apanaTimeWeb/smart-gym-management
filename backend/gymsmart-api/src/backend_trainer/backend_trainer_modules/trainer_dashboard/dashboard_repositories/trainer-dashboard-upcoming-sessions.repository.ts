// RESPONSIBILITY: Owns upcoming Trainer session reads for the selected dashboard range.
// FLOW: TrainerDashboardUpcomingSessionsService → repository → sessions/member query.

import { Injectable } from '@nestjs/common';
import { CoreBaseRepository } from '@/backend_trainer/backend_core/core_database/core-base.repository';
import { CoreTenantDatasourceResolver } from '@/backend_trainer/backend_core/core_database/core-tenant-datasource.resolver';
import type { DashboardUpcomingSession } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_types/trainer-dashboard.types';


/**
 * Intent: Defines the TrainerDashboardUpcomingSessionsRepository boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class TrainerDashboardUpcomingSessionsRepository extends CoreBaseRepository {
  constructor(private readonly resolver: CoreTenantDatasourceResolver) { super(); }

  /** Returns the next five upcoming trainer-owned sessions inside a reporting window. */
  /**
 * @description Executes findByRange inside the owning backend service/repository boundary without exposing ORM details.
 * @param trainerId - Input for findByRange.
 * @param startDate - Input for findByRange.
 * @param endDate - Input for findByRange.
 * @returns {Promise<DashboardUpcomingSession[]>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findByRange(trainerId: string, startDate: string, endDate: string): Promise<DashboardUpcomingSession[]> {
    const rows = await (await this.resolver.getDataSource()).createQueryBuilder().select(['s.id AS id', 'COALESCE(m.name, s.title) AS name', 's.time AS time', 's.type AS type']).from('trainer_sessions', 's').leftJoin('trainer_members', 'm', 'm.id = s.member_id AND m.deleted_at IS NULL').where("s.deleted_at IS NULL AND s.trainer_id = :trainerId AND s.status = 'UPCOMING' AND s.session_date BETWEEN :startDate AND :endDate", { trainerId, startDate, endDate }).orderBy('s.session_date', 'ASC').addOrderBy('s.time', 'ASC').limit(5).getRawMany<{id:string;name:string;time:string;type:string}>();
    const typeLabels: Record<string, string> = { PT: 'PT', GROUP: 'Group', Group: 'Group' };
    return rows.map((row)=>({ ...row, type: typeLabels[row.type] ?? row.type }));
  }
}
