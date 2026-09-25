// RESPONSIBILITY: Serves read-only notification listing for the Superadmin messaging feature.
// FLOW: HTTP GET -> NotificationService.list -> notification repository -> response DTO.
import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { SuperadminMessagingNotificationService } from '@/backend_superadmin/superadmin_modules/messaging/messaging_services/superadmin-messaging-notification.service';
import { SuperadminMessagingNotificationResponseDto } from '@/backend_superadmin/superadmin_modules/messaging/messaging_responses/superadmin-messaging-notification-response.dto';

/**
 * Primary Intent: Defines SuperadminMessagingNotificationQueryController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('messaging-notifications')
@Controller()
@UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminMessagingNotificationQueryController {
  constructor(private readonly service: SuperadminMessagingNotificationService) {}
/**
 * Primary Intent: Executes the list use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Lists notifications for the current Superadmin. */
  // SLA: STANDARD
  // SLA: FAST
  @Get(['superadmin/messaging/notifications', 'api/superadmin/messaging/notifications'])
  @ApiResponse({ status: HttpStatus.OK, type: [SuperadminMessagingNotificationResponseDto] })
  @ApiOperation({ summary: 'list' })
  /**
   * Primary Intent: Executes the list use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async list(): Promise<SuperadminMessagingNotificationResponseDto[]> { 
    const list = await this.service.list(); 
    return list.map(item => ({ ...item, createdAt: item.createdAt.toISOString() }) as unknown as SuperadminMessagingNotificationResponseDto); 
  }
}
