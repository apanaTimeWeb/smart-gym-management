// RESPONSIBILITY: Owns the command HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/body -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-idempotency.decorator';
import { SuperadminWhiteLabelingStatusDto } from '@/backend_superadmin/superadmin_modules/white-labeling/white-labeling_dtos/superadmin-white-labeling-status.dto';
import { SuperadminWhiteLabelingStatusService } from '@/backend_superadmin/superadmin_modules/white-labeling/white-labeling_services/superadmin-white-labeling-status.service';

/**
 * Primary Intent: Defines SuperadminWhiteLabelingDomainsCommandController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('whitelabelingdomainscommand')
@Controller()
@UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminWhiteLabelingDomainsCommandController {
  constructor(private readonly statusService: SuperadminWhiteLabelingStatusService) {}
/**
 * Primary Intent: Executes the status use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Executes PATCH /superadmin/white-labeling/domains/:id/status. */
  @ApiOperation({ summary: 'PATCH /superadmin/white-labeling/domains/:id/status' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  // SLA: STANDARD
@Patch('superadmin/white-labeling/domains/:id/status')
@Patch('api/superadmin/white-labeling/domains/:id/status')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @ApiOperation({ summary: 'status' })
  /**
   * Primary Intent: Executes the status use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async status(@Param('id') id: string, @Body() body: SuperadminWhiteLabelingStatusDto): Promise<Awaited<ReturnType<SuperadminWhiteLabelingStatusService['changeWhiteLabelingStatus']>>> { return await this.statusService.changeWhiteLabelingStatus(id, body.status); }

}
