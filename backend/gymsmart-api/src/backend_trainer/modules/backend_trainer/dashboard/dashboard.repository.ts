// RESPONSIBILITY: Owns trainer-scoped Dashboard SQL aggregation and read provenance.
// FLOW: DashboardStatsService → DashboardRepository → tenant TypeORM query builders.

import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CoreBaseRepository } from '@/backend_trainer/core/database/core-base.repository';
import { CoreTenantDataSourceResolver } from '@/backend_trainer/core/database/core-tenant-datasource.resolver';
import type {
  DashboardInterfaces,
  DashboardPlanDistribution,
  DashboardRecentMember,
  DashboardRecentMemberProgress,
  DashboardUpcomingSession,
  DashboardTrendPoint,
} from '@/backend_trainer/modules/backend_trainer/dashboard/dashboard.interfaces';

interface DashboardRange {
  startDate: string;
  endDate: string;
}

@Injectable()
export class DashboardRepository extends CoreBaseRepository {
  constructor(private readonly resolver: CoreTenantDataSourceResolver) {
    super();
  }

  /** Returns all dashboard UI aggregates for one trainer and one date range. */
  async getStats(trainerId: string, range: DashboardRange): Promise<DashboardInterfaces> {
    const dataSource = await this.resolver.getDataSource();
    const [kpis, trend, plans, upcomingSessions, recentProgress, recentMembers, profile] = await Promise.all([
      this.getKpis(dataSource, trainerId, range),
      this.getGoalTrend(dataSource, trainerId, range),
      this.getMembershipDistribution(dataSource, trainerId),
      this.getUpcomingSessions(dataSource, trainerId, range),
      this.getRecentProgress(dataSource, trainerId),
      this.getRecentMembers(dataSource, trainerId),
      this.getTrainerProfile(dataSource, trainerId),
    ]);

    return {
      ...kpis,
      goalCompletionTrend: trend,
      recentMemberProgress: recentProgress,
      upcomingSessions,
      membersByPlan: plans,
      recentMembers,
      trainerProfile: profile,
    };
  }

  /** Calculates trainer-scoped operational KPI values. */
  private async getKpis(dataSource: DataSource, trainerId: string, range: DashboardRange): Promise<Pick<DashboardInterfaces, 'todaysSessions' | 'completedSessions' | 'pendingSessions' | 'myMembersCount' | 'todaysAttendance' | 'pendingWorkoutPlans' | 'memberGoalCompletionRate'>> {
    const members = await dataSource.createQueryBuilder().select('COUNT(1)', 'count').from('trainer_members', 'm').where('m.deleted_at IS NULL').andWhere('m.assigned_trainer_id = :trainerId', { trainerId }).getRawOne<{ count: string }>();
    const pendingPlans = await dataSource.createQueryBuilder().select('COUNT(1)', 'count').from('trainer_members', 'm').where('m.deleted_at IS NULL').andWhere('m.assigned_trainer_id = :trainerId', { trainerId }).andWhere('m.assigned_workout_id IS NULL', {}).getRawOne<{ count: string }>();
    const sessions = await dataSource.createQueryBuilder().select(['s.status AS status']).from('trainer_sessions', 's').where('s.deleted_at IS NULL').andWhere('s.trainer_id = :trainerId', { trainerId }).andWhere('s.session_date BETWEEN :startDate AND :endDate', range).getRawMany<{ status: string }>();
    const attendance = await dataSource.createQueryBuilder().select('COUNT(1)', 'count').from('trainer_attendance_records', 'a').where('a.deleted_at IS NULL').andWhere('a.member_id IS NOT NULL').andWhere('a.date = CURRENT_DATE').andWhere('EXISTS (SELECT 1 FROM trainer_members m WHERE m.id = a.member_id AND m.assigned_trainer_id = :trainerId AND m.deleted_at IS NULL)', { trainerId }).getRawOne<{ count: string }>();
    const goal = await dataSource.createQueryBuilder().select("COUNT(*) FILTER (WHERE m.progress_status = 'Good')", 'good').addSelect('COUNT(1)', 'total').from('trainer_members', 'm').where('m.deleted_at IS NULL').andWhere('m.assigned_trainer_id = :trainerId', { trainerId }).getRawOne<{ good: string; total: string }>();
    const totalMembers = Number(members?.count ?? 0);
    const goalTotal = Number(goal?.total ?? 0);

    return {
      todaysSessions: sessions.length,
      completedSessions: sessions.filter((session: { status: string }) => session.status === 'Completed').length,
      pendingSessions: sessions.filter((session: { status: string }) => session.status === 'Upcoming').length,
      myMembersCount: totalMembers,
      todaysAttendance: Number(attendance?.count ?? 0),
      pendingWorkoutPlans: Number(pendingPlans?.count ?? 0),
      memberGoalCompletionRate: goalTotal === 0 ? 0 : Math.round((Number(goal?.good ?? 0) / goalTotal) * 100),
    };
  }

  /** Builds the three-month goal-completion trend consumed by the dashboard chart. */
  private async getGoalTrend(dataSource: DataSource, trainerId: string, range: DashboardRange): Promise<DashboardTrendPoint[]> {
    const rows = await dataSource.createQueryBuilder().select("TO_CHAR(DATE_TRUNC('month', p.date), 'Mon YYYY')", 'month').addSelect("ROUND(AVG(CASE WHEN m.progress_status = 'Good' THEN 100 ELSE 0 END))", 'rate').from('trainer_progress_entries', 'p').innerJoin('trainer_members', 'm', 'm.id = p.member_id AND m.deleted_at IS NULL').where('p.deleted_at IS NULL').andWhere('m.assigned_trainer_id = :trainerId', { trainerId }).andWhere('p.date BETWEEN :startDate AND :endDate', range).groupBy("DATE_TRUNC('month', p.date)").orderBy("DATE_TRUNC('month', p.date)", 'DESC').limit(6).getRawMany<{ month: string; rate: string }>();
    return rows.reverse().map((row: Record<string, unknown>) => ({ month: row.month as string, rate: Number(row.rate) }));
  }

  /** Returns assigned-member distribution grouped by plan. */
  private async getMembershipDistribution(dataSource: DataSource, trainerId: string): Promise<DashboardPlanDistribution[]> {
    const rows = await dataSource.createQueryBuilder().select("COALESCE(m.plan_name, 'Unknown')", 'plan').addSelect('COUNT(1)', 'count').from('trainer_members', 'm').where('m.deleted_at IS NULL').andWhere('m.assigned_trainer_id = :trainerId', { trainerId }).groupBy('m.plan_name').orderBy('count', 'DESC').getRawMany<{ plan: string; count: string }>();
    return rows.map((row: Record<string, unknown>) => ({ plan: row.plan as string, count: Number(row.count) }));
  }

  /** Returns the next trainer-owned sessions within the requested reporting window. */
  private async getUpcomingSessions(dataSource: DataSource, trainerId: string, range: DashboardRange): Promise<DashboardUpcomingSession[]> {
    const rows = await dataSource.createQueryBuilder().select(['s.id AS id', 'COALESCE(m.name, s.title) AS name', 's.time AS time', 's.type AS type']).from('trainer_sessions', 's').leftJoin('trainer_members', 'm', 'm.id = s.member_id AND m.deleted_at IS NULL').where('s.deleted_at IS NULL').andWhere('s.trainer_id = :trainerId', { trainerId }).andWhere("s.status = 'Upcoming'").andWhere('s.session_date BETWEEN :startDate AND :endDate', range).orderBy('s.session_date', 'ASC').addOrderBy('s.time', 'ASC').limit(5).getRawMany<DashboardUpcomingSession>();
    return rows;
  }

  /** Returns the five newest trainer-scoped member progress activities. */
  private async getRecentProgress(dataSource: DataSource, trainerId: string): Promise<DashboardRecentMemberProgress[]> {
    const rows = await dataSource.createQueryBuilder().select(['p.id AS id', 'm.name AS name', 'p.weight_kg AS weight', 'p.bmi AS bmi', 'p.date AS date']).from('trainer_progress_entries', 'p').innerJoin('trainer_members', 'm', 'm.id = p.member_id').where('p.deleted_at IS NULL').andWhere('m.deleted_at IS NULL').andWhere('m.assigned_trainer_id = :trainerId', { trainerId }).orderBy('p.date', 'DESC').addOrderBy('p.created_at', 'DESC').limit(5).getRawMany<{ id: string; name: string; weight: number | null; bmi: number | null; date: string }>();
    return rows.map((row: Record<string, unknown>) => ({ id: row.id as string, name: row.name as string, detail: `Latest progress: ${row.weight ?? 'N/A'} kg, BMI ${row.bmi ?? 'N/A'}`, time: row.date as string }));
  }

  /** Returns the five newest trainer-assigned members. */
  private async getRecentMembers(dataSource: DataSource, trainerId: string): Promise<DashboardRecentMember[]> {
    const rows = await dataSource.createQueryBuilder().select(['m.id AS id', 'm.name AS name', "COALESCE(m.plan_name, 'Unknown') AS plan", 'm.status AS status', 'm.join_date AS "joinDate"']).from('trainer_members', 'm').where('m.deleted_at IS NULL').andWhere('m.assigned_trainer_id = :trainerId', { trainerId }).orderBy('m.join_date', 'DESC').limit(5).getRawMany<DashboardRecentMember>();
    return rows;
  }

  /** Returns trainer profile identity and schedule fields shown by the dashboard. */
  private async getTrainerProfile(dataSource: DataSource, trainerId: string): Promise<DashboardInterfaces['trainerProfile']> {
    const row = await dataSource.createQueryBuilder().select(['p.id AS id', 'p.name AS name']).from('trainer_profiles', 'p').where('p.deleted_at IS NULL').andWhere('p.user_id = :trainerId', { trainerId }).getRawOne<{ id: string; name: string }>();
    return row ?? {};
  }
}
