// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, Body, Get, Param, Patch, Post, Query, HttpStatus } from '@nestjs/common';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { SuperadminMessagingWhatsappBulkCenterResponseDto } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging-whatsapp-bulk-center-response.dto';
import { SuperadminMessagingTemplateInsightsResponseDto } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging-template-insights-response.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminMessagingTemplateInsightsService } from '@/backend_superadmin/superadmin_modules/messaging/messaging_services/superadmin-messaging-template-insights.service';
import { SuperadminMessagingWhatsappBulkCenterService } from '@/backend_superadmin/superadmin_modules/messaging/messaging_services/superadmin-messaging-whatsapp-bulk-center.service';
import { SuperadminQueryDto } from '@/backend_superadmin/superadmin_core/superadmin_core_pagination/superadmin-query.dto';

/**
 * Primary Intent: Defines SuperadminMessagingInsightsQueryController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('messaginginsightsquery')
@Controller()
@UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminMessagingInsightsQueryController {
  constructor(private readonly templateInsightsService: SuperadminMessagingTemplateInsightsService, private readonly whatsappBulkCenterService: SuperadminMessagingWhatsappBulkCenterService) {}
/**
 * Primary Intent: Executes the templateInsights use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Executes GET /superadmin/messaging/template-insights. */
  // SLA: FAST
    @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  // SLA: FAST
@Get('superadmin/messaging/template-insights')
  @Get('api/superadmin/messaging/template-insights')
  @ApiResponse({ type: SuperadminMessagingTemplateInsightsResponseDto })
  @ApiOperation({ summary: 'templateInsights' })
  /**
   * Primary Intent: Executes the templateInsights use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async templateInsights(@Query() query: SuperadminQueryDto): Promise<SuperadminMessagingTemplateInsightsResponseDto> { return (await this.templateInsightsService.findMessagingTemplateInsights({ query })) as unknown as SuperadminMessagingTemplateInsightsResponseDto; }
/**
 * Primary Intent: Executes the whatsappBulkCenter use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Executes GET /superadmin/messaging/whatsapp/bulk-center. */
  // SLA: HEAVY
  @Get('superadmin/messaging/whatsapp/bulk-center')
  @ApiResponse({ type: SuperadminMessagingWhatsappBulkCenterResponseDto })
  @ApiOperation({ summary: 'whatsappBulkCenter' })
  /**
   * Primary Intent: Executes the whatsappBulkCenter use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async whatsappBulkCenter(@Query() query: SuperadminQueryDto): Promise<SuperadminMessagingWhatsappBulkCenterResponseDto> { return (await this.whatsappBulkCenterService.findMessagingWhatsAppBulkCenter({ query })) as unknown as SuperadminMessagingWhatsappBulkCenterResponseDto; }

}
