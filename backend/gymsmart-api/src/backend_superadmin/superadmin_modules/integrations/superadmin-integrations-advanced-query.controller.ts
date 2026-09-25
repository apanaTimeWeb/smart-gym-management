// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, Body, Get, Param, Patch, Post, Query, HttpStatus } from '@nestjs/common';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminIntegrationsMainService } from '@/backend_superadmin/superadmin_modules/integrations/integrations_services/superadmin-integrations-main.service';
import { SuperadminIntegrationsResponseDataDto, SuperadminGenerateApiKeyResultDto } from '@/backend_superadmin/superadmin_modules/integrations/integrations_responses/superadmin-integrations-response-data.dto';
import { SuperadminQueryDto } from '@/backend_superadmin/superadmin_core/superadmin_core_pagination/superadmin-query.dto';

/**
 * Primary Intent: Defines SuperadminIntegrationsAdvancedQueryController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('integrationsadvancedquery')
@Controller()
@UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminIntegrationsAdvancedQueryController {
  constructor(private readonly mainService: SuperadminIntegrationsMainService) {}
/**
 * Primary Intent: Executes the main use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Executes GET /superadmin/integrations. */
  // SLA: FAST
  @Get(['superadmin/integrations', 'api/superadmin/integrations'])
  @ApiResponse({ type: SuperadminIntegrationsResponseDataDto })
  @ApiOperation({ summary: 'main' })
  /**
   * Primary Intent: Executes the main use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async main(@Query() query: SuperadminQueryDto): Promise<SuperadminIntegrationsResponseDataDto> { return (await this.mainService.findIntegrationsData({ query })) as unknown as SuperadminIntegrationsResponseDataDto; }

  /** Executes GET /superadmin/integrations/keys - lists all integration API keys. */
  // SLA: FAST
  @Get(['superadmin/integrations/keys', 'api/superadmin/integrations/keys'])
  @ApiResponse({ type: SuperadminIntegrationsResponseDataDto })
  @ApiOperation({ summary: 'listKeys' })
  /**
   * Primary Intent: Returns the keys list from the integrations overview.
   * AI-Note: This fixed-path route must remain before the /:id wildcard to avoid being swallowed by it.
   */
  async listKeys(@Query() query: SuperadminQueryDto): Promise<SuperadminIntegrationsResponseDataDto> { return (await this.mainService.findIntegrationsData({ query })) as unknown as SuperadminIntegrationsResponseDataDto; }

}
