// RESPONSIBILITY: Owns isolated read-side dashboard widget use cases; no write persistence occurs here.
// FLOW: DashboardQueryController -> widget use case -> repository read model -> feature mapper -> ApiResponse.
import { Injectable, NotFoundException } from '@nestjs/common';

import { AdminDashboardQueryDto } from '@/backend_admin/admin_modules/admin_dashboard/dashboard_dtos/admin-dashboard-query.dto.js';
import { AdminDashboardResponseDto, AdminDashboardKpisResponseDto, AdminDashboardChartsResponseDto, AdminDashboardLeaderboardResponseDto, AdminDashboardAlertsResponseDto } from '@/backend_admin/admin_modules/admin_dashboard/dashboard_dtos/admin-dashboard-response.dto.js';
import { AdminDashboardResponsePresenter } from '@/backend_admin/admin_modules/admin_dashboard/dashboard_mappers/admin-dashboard.response.presenter.js';
import { AdminDashboardWidgetResponsePresenter } from '@/backend_admin/admin_modules/admin_dashboard/dashboard_mappers/admin-dashboard-widget.response.presenter.js';
import { AdminDashboardRepository } from '@/backend_admin/admin_modules/admin_dashboard/dashboard_repositories/admin-dashboard-repository.js';

@Injectable()
/**
 * @description Defines the AdminDashboardQueryService boundary for the admin_dashboard backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminDashboardQueryService {
  constructor(private readonly repository: AdminDashboardRepository, private readonly presenter: AdminDashboardResponsePresenter, private readonly widgetMapper: AdminDashboardWidgetResponsePresenter) {}

  /** @description Returns isolated dashboard KPI data for the selected filter scope. @param query Validated dashboard filter query. @returns KPI widget contract. @throws NotFoundException when no fresh read model exists. */
  async findKpis(query: AdminDashboardQueryDto): Promise<AdminDashboardKpisResponseDto> {
    const model = await this.repository.findLatestReadModel(query);
    if (!model) throw new NotFoundException('DASHBOARD.READ_MODEL.NOT_FOUND');
    return this.presenter.toKpisResponse(model);
  }

  /** @description Returns chart-series data independently from dashboard KPIs. @param query Validated dashboard filter query. @returns Charts widget contract. @throws NotFoundException when no fresh read model exists. */
  async findCharts(query: AdminDashboardQueryDto): Promise<AdminDashboardChartsResponseDto> {
    const model = await this.repository.findLatestReadModel(query);
    if (!model) throw new NotFoundException('DASHBOARD.READ_MODEL.NOT_FOUND');
    return this.widgetMapper.toChartsResponse(model);
  }

  /** @description Returns branch leaderboard data independently from other dashboard widgets. @param query Validated dashboard filter query. @returns Leaderboard widget contract. @throws NotFoundException when no fresh read model exists. */
  async findLeaderboard(query: AdminDashboardQueryDto): Promise<AdminDashboardLeaderboardResponseDto> {
    const model = await this.repository.findLatestReadModel(query);
    if (!model) throw new NotFoundException('DASHBOARD.READ_MODEL.NOT_FOUND');
    return this.widgetMapper.toLeaderboardResponse(model);
  }

  /** @description Returns alerts and expiring memberships independently from other dashboard widgets. @param query Validated dashboard filter query. @returns Alerts widget contract. @throws NotFoundException when no fresh read model exists. */
  async findAlerts(query: AdminDashboardQueryDto): Promise<AdminDashboardAlertsResponseDto> {
    const model = await this.repository.findLatestReadModel(query);
    if (!model) throw new NotFoundException('DASHBOARD.READ_MODEL.NOT_FOUND');
    return this.widgetMapper.toAlertsResponse(model);
  }

  /** @description Preserves the active legacy Admin dashboard contract using the existing dashboard read model without introducing a new Mega API query graph. @param query Validated dashboard query. @returns Legacy dashboard response. */
  async findLegacyDashboardStats(query: AdminDashboardQueryDto): Promise<AdminDashboardResponseDto> {
    const entity = await this.repository.findLatestReadModel(query);
    if (!entity) throw new NotFoundException('DASHBOARD.READ_MODEL.NOT_FOUND');
    return this.presenter.toLegacyResponse(entity);
  }
}
