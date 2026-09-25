// RESPONSIBILITY: Owns the command HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/body -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-idempotency.decorator';
import { SuperadminGymsBusinessControlsBulkActionDto } from '@/backend_superadmin/superadmin_modules/gyms/gyms_dtos/superadmin-gyms-business-controls-bulk-action.dto';
import { SuperadminGymsBusinessControlsResponseDto } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms-business-controls-response.dto';
import { SuperadminGymsBulkActionService } from '@/backend_superadmin/superadmin_modules/gyms/gyms_services/superadmin-gyms-bulk-action.service';
import { SuperadminGymsOperationalService } from '@/backend_superadmin/superadmin_modules/gyms/gyms_services/superadmin-gyms-operational.service';
import { SuperadminGymsOwnerEmailDto } from '@/backend_superadmin/superadmin_modules/gyms/gyms_dtos/superadmin-gyms-owner-email.dto';

/**
 * Primary Intent: Defines SuperadminGymsAdministrationCommandController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('gymsadministrationcommand')
@Controller()
@UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminGymsAdministrationCommandController {
  constructor(private readonly bulkActionService: SuperadminGymsBulkActionService, private readonly operationalService: SuperadminGymsOperationalService) {}
/**
 * Primary Intent: Executes the bulkAction use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Executes POST /superadmin/gyms/business-controls. */
  @ApiOperation({ summary: 'POST /superadmin/gyms/business-controls' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  // SLA: HEAVY
@Post(['superadmin/gyms/business-controls', 'api/superadmin/gyms/business-controls'])
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @ApiOperation({ summary: 'bulkAction' })
  /**
   * Primary Intent: Executes the bulkAction use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async bulkAction(@Body() body: SuperadminGymsBusinessControlsBulkActionDto): Promise<SuperadminGymsBusinessControlsResponseDto> { return await this.bulkActionService.applyGymsBulkAction(body) as unknown as SuperadminGymsBusinessControlsResponseDto; }
/**
 * Primary Intent: Executes the emailOwner use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Sends an owner-message command after verifying the Gym exists. */
  @ApiOperation({ summary: 'POST /superadmin/gyms/:id/email' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('superadmin/gyms/:id/email')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @ApiOperation({ summary: 'emailOwner' })
  /**
   * Primary Intent: Executes the emailOwner use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async emailOwner(@Param('id') id: string, @Body() body: SuperadminGymsOwnerEmailDto): Promise<null> { return this.operationalService.emailOwner(id, body.subject, body.message); }
/**
 * Primary Intent: Executes the impersonate use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Issues a short-lived, signed impersonation artifact for the tenant boundary. */
  @ApiOperation({ summary: 'POST /superadmin/gyms/:id/impersonate' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
@Post('superadmin/gyms/:id/impersonate')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @ApiOperation({ summary: 'impersonate' })
  /**
   * Primary Intent: Executes the impersonate use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async impersonate(@Param('id') id: string): Promise<{ token: string }> { return this.operationalService.impersonate(id); }

}
