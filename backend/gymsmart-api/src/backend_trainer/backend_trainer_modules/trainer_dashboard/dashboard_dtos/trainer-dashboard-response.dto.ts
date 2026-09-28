// RESPONSIBILITY: Documents every Trainer Dashboard widget and composition response shape consumed by the frontend.
// FLOW: Dashboard query service → response DTO contract → canonical API envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


/**
 * Intent: Defines the TrainerDashboardProfileSummaryResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerDashboardProfileSummaryResponseDto { @ApiPropertyOptional() id?: string; @ApiPropertyOptional() name?: string; @ApiPropertyOptional() shiftStart?: string; @ApiPropertyOptional() shiftEnd?: string; }

/**
 * Intent: Defines the TrainerDashboardRecentMemberResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerDashboardRecentMemberResponseDto { @ApiProperty() id!: string; @ApiProperty() name!: string; @ApiProperty({ oneOf: [{ type: 'string' }, { type: 'object', properties: { name: { type: 'string' } } }] }) plan!: string | { name: string }; @ApiProperty() status!: string; @ApiProperty() joinDate!: string; }

/**
 * Intent: Defines the TrainerDashboardKpisResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerDashboardKpisResponseDto { @ApiProperty() todaysSessions!: number; @ApiProperty() completedSessions!: number; @ApiProperty() pendingSessions!: number; @ApiProperty() myMembersCount!: number; @ApiProperty() todaysAttendance!: number; @ApiProperty() pendingWorkoutPlans!: number; @ApiProperty() memberGoalCompletionRate!: number; }

/**
 * Intent: Defines the TrainerDashboardTrendPointResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerDashboardTrendPointResponseDto { @ApiProperty() month!: string; @ApiProperty() rate!: number; }

/**
 * Intent: Defines the TrainerDashboardTrendResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerDashboardTrendResponseDto { @ApiProperty({ type: [TrainerDashboardTrendPointResponseDto] }) goalCompletionTrend!: TrainerDashboardTrendPointResponseDto[]; }

/**
 * Intent: Defines the TrainerDashboardPlanDistributionResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerDashboardPlanDistributionResponseDto { @ApiProperty() plan!: string; @ApiProperty() count!: number; }

/**
 * Intent: Defines the TrainerDashboardMembershipDistributionResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerDashboardMembershipDistributionResponseDto { @ApiProperty({ type: [TrainerDashboardPlanDistributionResponseDto] }) membersByPlan!: TrainerDashboardPlanDistributionResponseDto[]; }

/**
 * Intent: Defines the TrainerDashboardUpcomingSessionResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerDashboardUpcomingSessionResponseDto { @ApiProperty() id!: string; @ApiProperty() name!: string; @ApiProperty() time!: string; @ApiProperty() type!: string; }

/**
 * Intent: Defines the TrainerDashboardUpcomingSessionsResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerDashboardUpcomingSessionsResponseDto { @ApiProperty({ type: [TrainerDashboardUpcomingSessionResponseDto] }) upcomingSessions!: TrainerDashboardUpcomingSessionResponseDto[]; }

/**
 * Intent: Defines the TrainerDashboardRecentProgressItemResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerDashboardRecentProgressItemResponseDto { @ApiProperty() id!: string; @ApiProperty() name!: string; @ApiProperty() detail!: string; @ApiProperty() time!: string; }

/**
 * Intent: Defines the TrainerDashboardRecentProgressResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerDashboardRecentProgressResponseDto { @ApiProperty({ type: [TrainerDashboardRecentProgressItemResponseDto] }) recentMemberProgress!: TrainerDashboardRecentProgressItemResponseDto[]; }

/**
 * Intent: Defines the TrainerDashboardStatsResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerDashboardStatsResponseDto {
  @ApiProperty() todaysSessions!: number; @ApiProperty() completedSessions!: number; @ApiProperty() pendingSessions!: number; @ApiProperty() myMembersCount!: number; @ApiProperty() todaysAttendance!: number; @ApiProperty() pendingWorkoutPlans!: number; @ApiProperty() memberGoalCompletionRate!: number;
  @ApiPropertyOptional({ type: [TrainerDashboardTrendPointResponseDto] }) goalCompletionTrend?: TrainerDashboardTrendPointResponseDto[];
  @ApiProperty({ type: [TrainerDashboardRecentProgressItemResponseDto] }) recentMemberProgress!: TrainerDashboardRecentProgressItemResponseDto[];
  @ApiProperty({ type: [TrainerDashboardUpcomingSessionResponseDto] }) upcomingSessions!: TrainerDashboardUpcomingSessionResponseDto[];
  @ApiPropertyOptional({ type: [TrainerDashboardPlanDistributionResponseDto] }) membersByPlan?: TrainerDashboardPlanDistributionResponseDto[];
  @ApiPropertyOptional({ type: [TrainerDashboardRecentMemberResponseDto] }) recentMembers?: TrainerDashboardRecentMemberResponseDto[];
  @ApiPropertyOptional({ type: TrainerDashboardProfileSummaryResponseDto }) trainerProfile?: TrainerDashboardProfileSummaryResponseDto;
}
