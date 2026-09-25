// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Patch, Req } from '@nestjs/common';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminProfileMainService } from '@/backend_superadmin/superadmin_modules/profile/profile_services/superadmin-profile-main.service';
import type { SuperadminAuthenticatedUser } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.types';
import type { Request } from 'express';

/**
 * Primary Intent: Defines SuperadminProfileAdvancedQueryController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('profileadvancedquery')
@Controller()
@UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminProfileAdvancedQueryController {
  constructor(private readonly mainService: SuperadminProfileMainService) {}
/**
 * Primary Intent: Executes the main use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Executes GET /superadmin/profile. */
  // SLA: FAST
  @Get('superadmin/profile')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @ApiOperation({ summary: 'main' })
  /**
   * Primary Intent: Executes the main use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async main(@Req() request: Request & { user?: SuperadminAuthenticatedUser }): Promise<Awaited<ReturnType<SuperadminProfileMainService['findProfile']>>> { return this.mainService.findProfile(request.user!.userId); }

}
