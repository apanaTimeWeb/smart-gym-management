// RESPONSIBILITY: Owns Trainer Dashboard KPI aggregation with strict today semantics.
// FLOW: TrainerDashboardKpisService → TrainerDashboardKpisRepository → tenant database aggregates.

import { Injectable } from '@nestjs/common';
import { CoreBaseRepository } from '@/backend_trainer/backend_core/core_database/core-base.repository';
import { CoreTenantDatasourceResolver } from '@/backend_trainer/backend_core/core_database/core-tenant-datasource.resolver';
import type { DashboardKpis } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_types/trainer-dashboard.types';


/**
 * Intent: Defines the TrainerDashboardKpisRepository boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class TrainerDashboardKpisRepository extends CoreBaseRepository {
  constructor(private readonly resolver: CoreTenantDatasourceResolver) { super(); }

  /** Returns operational KPI values for the current trainer and current calendar day. */
  /**
 * @description Executes findToday inside the owning backend service/repository boundary without exposing ORM details.
 * @param trainerId - Input for findToday.
 * @returns {Promise<DashboardKpis>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findToday(trainerId: string): Promise<DashboardKpis> {
    const dataSource = await this.resolver.getDataSource();
    const [members, pendingPlans, sessions, attendance, goal] = await Promise.all([
      dataSource.createQueryBuilder().select('COUNT(1)', 'count').from('trainer_members', 'm').where('m.deleted_at IS NULL AND m.assigned_trainer_id = :trainerId', { trainerId }).getRawOne<{ count: string }>(),
      dataSource.createQueryBuilder().select('COUNT(1)', 'count').from('trainer_members', 'm').where('m.deleted_at IS NULL AND m.assigned_trainer_id = :trainerId AND m.assigned_workout_id IS NULL', { trainerId }).getRawOne<{ count: string }>(),
      dataSource.createQueryBuilder().select('s.status', 'status').from('trainer_sessions', 's').where('s.deleted_at IS NULL AND s.trainer_id = :trainerId AND s.session_date = CURRENT_DATE', { trainerId }).getRawMany<{ status: string }>(),
      dataSource.createQueryBuilder().select('COUNT(1)', 'count').from('trainer_attendance_records', 'a').where("a.deleted_at IS NULL AND a.member_id IS NOT NULL AND a.date = CURRENT_DATE AND EXISTS (SELECT 1 FROM trainer_members m WHERE m.id = a.member_id AND m.assigned_trainer_id = :trainerId AND m.deleted_at IS NULL)", { trainerId }).getRawOne<{ count: string }>(),
      dataSource.createQueryBuilder().select("COUNT(*) FILTER (WHERE m.progress_status = 'GOOD')", 'good').addSelect('COUNT(1)', 'total').from('trainer_members', 'm').where('m.deleted_at IS NULL AND m.assigned_trainer_id = :trainerId', { trainerId }).getRawOne<{ good: string; total: string }>(),
    ]);
    const totalMembers = Number(members?.count ?? 0);
    const goalTotal = Number(goal?.total ?? 0);
    return {
      todaysSessions: sessions.length,
      completedSessions: sessions.filter((session) => session.status === 'COMPLETED').length,
      pendingSessions: sessions.filter((session) => session.status === 'UPCOMING').length,
      myMembersCount: totalMembers,
      todaysAttendance: Number(attendance?.count ?? 0),
      pendingWorkoutPlans: Number(pendingPlans?.count ?? 0),
      memberGoalCompletionRate: goalTotal === 0 ? 0 : Math.round((Number(goal?.good ?? 0) / goalTotal) * 100),
    };
  }
}
