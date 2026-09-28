// RESPONSIBILITY: Owns read-only Trainer Dashboard widget HTTP contracts; each endpoint maps to one widget/use case.
// FLOW: HTTP request → widget service → widget repository → canonical response interceptor.

import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { TrainerDashboardKpisResponseDto, TrainerDashboardMembershipDistributionResponseDto, TrainerDashboardRecentProgressResponseDto, TrainerDashboardStatsResponseDto, TrainerDashboardTrendResponseDto, TrainerDashboardUpcomingSessionsResponseDto } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_dtos/trainer-dashboard-response.dto';
import { CoreRoles } from '@/backend_trainer/backend_core/core_security/core-roles.decorator';
import { CoreRole } from '@/backend_trainer/backend_core/core_types/core-auth.types';
import { TrainerDashboardQueryDto } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_dtos/trainer-dashboard-query.dto';
import { TrainerDashboardKpisService } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_services/trainer-dashboard-kpis.service';
import { TrainerDashboardTrendService } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_services/trainer-dashboard-trend.service';
import { TrainerDashboardMembershipDistributionService } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_services/trainer-dashboard-membership-distribution.service';
import { TrainerDashboardUpcomingSessionsService } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_services/trainer-dashboard-upcoming-sessions.service';
import { TrainerDashboardRecentProgressService } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_services/trainer-dashboard-recent-progress.service';
import { TrainerDashboardTrainerStatsCompositionService } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_services/trainer-dashboard-trainer-stats-composition.service';


/**
 * Intent: Defines the TrainerDashboardQueryController boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@ApiTags('trainer/dashboard')
@Controller('trainer/dashboard')
export class TrainerDashboardQueryController {
  constructor(
    private readonly kpis: TrainerDashboardKpisService,
    private readonly trend: TrainerDashboardTrendService,
    private readonly membershipDistribution: TrainerDashboardMembershipDistributionService,
    private readonly upcomingSessions: TrainerDashboardUpcomingSessionsService,
    private readonly recentProgress: TrainerDashboardRecentProgressService,
    private readonly statsComposition: TrainerDashboardTrainerStatsCompositionService,
  ) {}

  // Compatibility route for the current frontend contract. Canonical widget APIs remain separate.
  // SLA: STANDARD
  @ApiOperation({ summary: 'Get Trainer trainer-dashboard-query.controller' })
@Get('stats') @CoreRoles(CoreRole.TRAINER)@ApiQuery({ type: TrainerDashboardQueryDto })
 @ApiResponse({ status: HttpStatus.OK, type: TrainerDashboardStatsResponseDto })
  /** Composes the current frontend Dashboard response from the widget services. */
  async findStats(@Query() query: TrainerDashboardQueryDto) { return this.statsComposition.find(query); }

  // SLA: FAST
  @ApiOperation({ summary: 'Get Trainer trainer-dashboard-query.controller' })
@Get('kpis') @CoreRoles(CoreRole.TRAINER) @ApiResponse({ status: HttpStatus.OK, type: TrainerDashboardKpisResponseDto })
  /** Returns current-day operational Trainer Dashboard KPIs. */
  async findKpis() { return this.kpis.find(); }

  // SLA: STANDARD
  @ApiOperation({ summary: 'Get Trainer trainer-dashboard-query.controller' })
@Get('trend') @CoreRoles(CoreRole.TRAINER)@ApiQuery({ type: TrainerDashboardQueryDto })
 @ApiResponse({ status: HttpStatus.OK, type: TrainerDashboardTrendResponseDto })
  /** Returns goal-completion trend for the selected reporting range. */
  async findTrend(@Query() query: TrainerDashboardQueryDto) { return this.trend.find(query); }

  // SLA: FAST
  @ApiOperation({ summary: 'Get Trainer trainer-dashboard-query.controller' })
@Get('membership-distribution') @CoreRoles(CoreRole.TRAINER) @ApiResponse({ status: HttpStatus.OK, type: TrainerDashboardMembershipDistributionResponseDto })
  /** Returns assigned-member distribution grouped by plan. */
  async findMembershipDistribution() { return this.membershipDistribution.find(); }

  // SLA: STANDARD
  @ApiOperation({ summary: 'Get Trainer trainer-dashboard-query.controller' })
@Get('upcoming-sessions') @CoreRoles(CoreRole.TRAINER)@ApiQuery({ type: TrainerDashboardQueryDto })
 @ApiResponse({ status: HttpStatus.OK, type: TrainerDashboardUpcomingSessionsResponseDto })
  /** Returns upcoming sessions inside the selected reporting range. */
  async findUpcomingSessions(@Query() query: TrainerDashboardQueryDto) { return this.upcomingSessions.find(query); }

  // SLA: FAST
  @ApiOperation({ summary: 'Get Trainer trainer-dashboard-query.controller' })
@Get('recent-progress') @CoreRoles(CoreRole.TRAINER) @ApiResponse({ status: HttpStatus.OK, type: TrainerDashboardRecentProgressResponseDto })
  /** Returns recent trainer-scoped member progress activity. */
  async findRecentProgress() { return this.recentProgress.find(); }
}
