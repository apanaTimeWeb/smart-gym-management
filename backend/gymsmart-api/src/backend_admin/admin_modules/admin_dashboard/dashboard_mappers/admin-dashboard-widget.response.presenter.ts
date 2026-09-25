// RESPONSIBILITY: Maps dashboard chart, leaderboard, and alert read-model data into typed widget contracts.
// FLOW: AdminDashboardDomainModel -> AdminDashboardWidgetResponsePresenter -> widget response DTO.
import { AdminDashboardChartsResponseDto, AdminDashboardLeaderboardResponseDto, AdminDashboardAlertsResponseDto } from '@/backend_admin/admin_modules/admin_dashboard/dashboard_dtos/admin-dashboard-response.dto'

import type { AdminDashboardDomainModel } from '@/backend_admin/admin_modules/admin_dashboard/dashboard_domain/admin-dashboard.domain'

/**
 * @description Defines the isolated widget mapping boundary for the Admin dashboard feature.
 * @remarks Keep business aggregation out of this mapper; the repository/query layer remains the source of truth for computed values.
 */
export class AdminDashboardWidgetResponsePresenter {
  /** @description Maps dashboard chart collections into the isolated charts widget contract. @param domain Dashboard read model. @returns Charts widget contract. */
  toChartsResponse(domain: AdminDashboardDomainModel): AdminDashboardChartsResponseDto {
    const currency = String(domain.data.currency ?? '');
    const revenueTrend = Array.isArray(domain.data.revenueTrend)
      ? domain.data.revenueTrend.flatMap((item) => {
          if (typeof item !== 'object' || item === null) return [];
          const row = item as Record<string, unknown>;
          return [{ month: String(row.month ?? ''), revenue: Number(row.revenue ?? 0), profit: Number(row.profit ?? 0), currency }];
        })
      : [];
    const memberGrowth = Array.isArray(domain.data.memberGrowth)
      ? domain.data.memberGrowth.flatMap((item) => {
          if (typeof item !== 'object' || item === null) return [];
          const row = item as Record<string, unknown>;
          return [{ month: String(row.month ?? ''), count: Number(row.count ?? 0) }];
        })
      : [];
    const membersByPlan = Array.isArray(domain.data.membersByPlan)
      ? domain.data.membersByPlan.flatMap((item) => {
          if (typeof item !== 'object' || item === null) return [];
          const row = item as Record<string, unknown>;
          return [{ plan: String(row.plan ?? ''), count: Number(row.count ?? 0) }];
        })
      : [];
    const rawStatus = typeof domain.data.membersByStatus === 'object' && domain.data.membersByStatus !== null ? domain.data.membersByStatus as Record<string, unknown> : {};
    const membersByStatus = { active: Number(rawStatus.active ?? 0), pending: Number(rawStatus.pending ?? 0), expired: Number(rawStatus.expired ?? 0) };
    const attendanceTrend = Array.isArray(domain.data.attendanceTrend)
      ? domain.data.attendanceTrend.flatMap((item) => {
          if (typeof item !== 'object' || item === null) return [];
          const row = item as Record<string, unknown>;
          return [{ date: String(row.date ?? ''), count: Number(row.count ?? 0) }];
        })
      : [];
    return { memberGrowth, revenueTrend, membersByPlan, membersByStatus, attendanceTrend };
  }

  /** @description Maps branch performance into the isolated dashboard leaderboard widget contract. @param domain Dashboard read model. @returns Leaderboard widget contract. */
  toLeaderboardResponse(domain: AdminDashboardDomainModel): AdminDashboardLeaderboardResponseDto {
    const currency = String(domain.data.currency ?? '');
    const branchLeaderboard = Array.isArray(domain.data.branchLeaderboard)
      ? domain.data.branchLeaderboard.flatMap((item) => {
          if (typeof item !== 'object' || item === null) return [];
          const row = item as Record<string, unknown>;
          const trend = row.trend === 'up' || row.trend === 'down' || row.trend === 'flat' ? row.trend : 'flat';
          return [{ id: String(row.id ?? ''), name: String(row.name ?? ''), revenue: Number(row.revenue ?? 0), activeMembers: Number(row.activeMembers ?? 0), currency, trend }];
        })
      : [];
    return { branchLeaderboard };
  }

  /** @description Maps system alerts and expiring memberships into the dashboard alerts widget. @param domain Dashboard read model. @returns Alerts widget contract. */
  toAlertsResponse(domain: AdminDashboardDomainModel): AdminDashboardAlertsResponseDto {
    const systemAlerts = Array.isArray(domain.data.systemAlerts)
      ? domain.data.systemAlerts.flatMap((item) => {
          if (typeof item !== 'object' || item === null) return [];
          const row = item as Record<string, unknown>;
          const severity = row.severity === 'high' || row.severity === 'medium' || row.severity === 'low' ? row.severity : 'low';
          return [{ id: String(row.id ?? ''), message: String(row.message ?? ''), severity, date: String(row.date ?? '') }];
        })
      : [];
    const expiringMemberships = Array.isArray(domain.data.expiringMemberships)
      ? domain.data.expiringMemberships.flatMap((item) => {
          if (typeof item !== 'object' || item === null) return [];
          const row = item as Record<string, unknown>;
          return [{ id: String(row.id ?? ''), name: String(row.name ?? ''), branch: String(row.branch ?? ''), plan: String(row.plan ?? ''), expiryDate: String(row.expiryDate ?? ''), daysLeft: Number(row.daysLeft ?? 0) }];
        })
      : [];
    return { systemAlerts: systemAlerts as any, expiringMemberships };
  }
}
