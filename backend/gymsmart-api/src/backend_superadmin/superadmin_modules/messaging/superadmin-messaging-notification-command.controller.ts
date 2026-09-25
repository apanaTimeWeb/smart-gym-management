// RESPONSIBILITY: Owns notification state mutations while keeping read operations in the query controller.
// FLOW: HTTP PATCH -> IdempotencyKey -> NotificationService -> notification repository -> canonical response.
import { Controller, HttpCode, HttpStatus, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-idempotency.decorator';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { SuperadminCoreRateLimitGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-rate-limit.guard';
import { SuperadminMessagingNotificationService } from '@/backend_superadmin/superadmin_modules/messaging/messaging_services/superadmin-messaging-notification.service';
import { SuperadminMessagingNotificationResponseDto } from '@/backend_superadmin/superadmin_modules/messaging/messaging_responses/superadmin-messaging-notification-response.dto';

/**
 * Primary Intent: Defines SuperadminMessagingNotificationCommandController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('messaging-notifications')
@Controller()
@UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminMessagingNotificationCommandController {
  constructor(private readonly service: SuperadminMessagingNotificationService) {}
/**
 * Primary Intent: Executes the markAllRead use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Marks every current notification as read. */
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(['superadmin/messaging/notifications/read-all', 'api/superadmin/messaging/notifications/read-all'])
  @HttpCode(HttpStatus.OK)
  @UseGuards(SuperadminCoreRateLimitGuard)
  @ApiResponse({ status: HttpStatus.OK, description: 'All notifications marked as read.' })
  @ApiOperation({ summary: 'markAllRead' })
  /**
   * Primary Intent: Executes the markAllRead use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async markAllRead(): Promise<null> { return this.service.markAllRead(); }
/**
 * Primary Intent: Executes the markRead use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Marks one notification as read. */
  @RequireIdempotencyKey()
  // SLA: STANDARD
@Patch(['superadmin/messaging/notifications/:id/read', 'api/superadmin/messaging/notifications/:id/read'])
  @HttpCode(HttpStatus.OK)
  @UseGuards(SuperadminCoreRateLimitGuard)
  @ApiResponse({ status: HttpStatus.OK, type: SuperadminMessagingNotificationResponseDto })
  @ApiOperation({ summary: 'markRead' })
  /**
   * Primary Intent: Executes the markRead use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async markRead(@Param('id') id: string): Promise<SuperadminMessagingNotificationResponseDto> { 
    const item = await this.service.markRead(id);
    return { ...item, createdAt: item.createdAt.toISOString() } as unknown as SuperadminMessagingNotificationResponseDto; 
  }
}
