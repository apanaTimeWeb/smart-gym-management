// RESPONSIBILITY: Owns the command HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/body -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Patch, Req } from '@nestjs/common';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-idempotency.decorator';
import { SuperadminProfileUpdateService } from '@/backend_superadmin/superadmin_modules/profile/profile_services/superadmin-profile-update.service';
import { SuperadminProfilePasswordService } from '@/backend_superadmin/superadmin_modules/profile/profile_services/superadmin-profile-password.service';
import { SuperadminProfileTwoFactorService } from '@/backend_superadmin/superadmin_modules/profile/profile_services/superadmin-profile-two-factor.service';
import { SuperadminProfileUpdateDto } from '@/backend_superadmin/superadmin_modules/profile/profile_dtos/superadmin-profile-update.dto';
import { SuperadminProfilePasswordChangeDto } from '@/backend_superadmin/superadmin_modules/profile/profile_dtos/superadmin-profile-password-change.dto';
import { SuperadminProfileTwoFactorDto } from '@/backend_superadmin/superadmin_modules/profile/profile_dtos/superadmin-profile-two-factor.dto';
import type { SuperadminAuthenticatedUser } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.types';
import type { Request } from 'express';

/**
 * Primary Intent: Defines SuperadminProfileSecurityCommandController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('profilesecuritycommand')
@Controller()
@UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminProfileSecurityCommandController {
  constructor(private readonly updateService: SuperadminProfileUpdateService, private readonly passwordService: SuperadminProfilePasswordService, private readonly twoFactorService: SuperadminProfileTwoFactorService) {}
/**
 * Primary Intent: Executes the update use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Executes PATCH /superadmin/profile. */
  @ApiOperation({ summary: 'PATCH /superadmin/profile' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch('superadmin/profile')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @ApiOperation({ summary: 'update' })
  /**
   * Primary Intent: Executes the update use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async update(@Req() request: Request & { user?: SuperadminAuthenticatedUser }, @Body() body: SuperadminProfileUpdateDto): Promise<Awaited<ReturnType<SuperadminProfileUpdateService['updateProfile']>>> { return this.updateService.updateProfile(request.user!.userId, body as never); }
/**
 * Primary Intent: Executes the password use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Executes PATCH /superadmin/profile/password. */
  @ApiOperation({ summary: 'PATCH /superadmin/profile/password' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch('superadmin/profile/password')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @ApiOperation({ summary: 'password' })
  /**
   * Primary Intent: Executes the password use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async password(@Req() request: Request & { user?: SuperadminAuthenticatedUser }, @Body() body: SuperadminProfilePasswordChangeDto): Promise<null> { await this.passwordService.updatePassword(request.user!.userId, body.currentPassword, body.newPassword, body.confirmPassword); return null; }
/**
 * Primary Intent: Executes the twoFactor use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Executes PATCH /superadmin/profile/2fa. */
  @ApiOperation({ summary: 'PATCH /superadmin/profile/2fa' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
@Patch('superadmin/profile/2fa')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @ApiOperation({ summary: 'twoFactor' })
  /**
   * Primary Intent: Executes the twoFactor use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async twoFactor(@Req() request: Request & { user?: SuperadminAuthenticatedUser }, @Body() body: SuperadminProfileTwoFactorDto): Promise<Awaited<ReturnType<SuperadminProfileTwoFactorService['updateTwoFactor']>>> { return this.twoFactorService.updateTwoFactor(request.user!.userId, body.enabled, body.password); }

}
