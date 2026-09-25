// RESPONSIBILITY: Owns HTTP transport for the features-command.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.

import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { SuperadminCoreRateLimitGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-rate-limit.guard';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-idempotency.decorator';
import { SuperadminFeaturesCreateDto } from '@/backend_superadmin/superadmin_modules/features/features_dtos/superadmin-features-create.dto';
import { SuperadminFeaturesUpdateDto } from '@/backend_superadmin/superadmin_modules/features/features_dtos/superadmin-features-update.dto';
import { SuperadminFeaturesCreateService } from '@/backend_superadmin/superadmin_modules/features/features_services/superadmin-features-create.service';
import { SuperadminFeaturesUpdateService } from '@/backend_superadmin/superadmin_modules/features/features_services/superadmin-features-update.service';
import { SuperadminFeaturesDeleteService } from '@/backend_superadmin/superadmin_modules/features/features_services/superadmin-features-delete.service';
import { SuperadminFeaturesToggleService } from '@/backend_superadmin/superadmin_modules/features/features_services/superadmin-features-toggle.service';
import { SuperadminFeaturesResponseDto } from '@/backend_superadmin/superadmin_modules/features/features_responses/superadmin-features-response.dto';

/**
 * Primary Intent: Defines SuperadminFeaturesCommandController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('features')
@Controller()
@UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminFeaturesCommandController {
  constructor(
    private readonly createService: SuperadminFeaturesCreateService,
    private readonly updateService: SuperadminFeaturesUpdateService,
    private readonly deleteService: SuperadminFeaturesDeleteService,
    private readonly toggleService: SuperadminFeaturesToggleService,
  ) {}
/**
 * Primary Intent: Executes the createFlag use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Creates a feature flag. */
  @ApiOperation({ summary: 'Create feature flag' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post(['api/superadmin/features/flags', 'api/superadmin/features/flags'])
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(SuperadminCoreRateLimitGuard)
  @ApiResponse({ type: SuperadminFeaturesResponseDto })
  @ApiOperation({ summary: 'createFlag' })
  /**
   * Primary Intent: Executes the createFlag use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async createFlag(@Body() body: SuperadminFeaturesCreateDto): Promise<SuperadminFeaturesResponseDto> {
    return this.createService.createFeatures(body);
  }
/**
 * Primary Intent: Executes the updateFlag use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Updates a feature flag. */
  @ApiOperation({ summary: 'Update feature flag' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(['api/superadmin/features/flags/:id', 'api/superadmin/features/flags/:id'])
  @UseGuards(SuperadminCoreRateLimitGuard)
  @ApiResponse({ type: SuperadminFeaturesResponseDto })
  @ApiOperation({ summary: 'updateFlag' })
  /**
   * Primary Intent: Executes the updateFlag use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async updateFlag(@Param('id') id: string, @Body() body: SuperadminFeaturesUpdateDto): Promise<SuperadminFeaturesResponseDto> {
    return this.updateService.updateFeatures(id, body);
  }
/**
 * Primary Intent: Executes the toggleFlag use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Toggles a feature flag and appends history. */
  @ApiOperation({ summary: 'Toggle feature flag' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post(['api/superadmin/features/flags/:id/toggle', 'api/superadmin/features/flags/:id/toggle'])
  @UseGuards(SuperadminCoreRateLimitGuard)
  @ApiResponse({ type: SuperadminFeaturesResponseDto })
  @ApiOperation({ summary: 'toggleFlag' })
  /**
   * Primary Intent: Executes the toggleFlag use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async toggleFlag(@Param('id') id: string): Promise<SuperadminFeaturesResponseDto> {
    return this.toggleService.toggleFeatures(id);
  }
/**
 * Primary Intent: Executes the deleteFlag use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Soft-deletes a feature flag. */
  @ApiOperation({ summary: 'Delete feature flag' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
@Delete(['api/superadmin/features/flags/:id', 'api/superadmin/features/flags/:id'])
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @HttpCode(HttpStatus.OK)
  @UseGuards(SuperadminCoreRateLimitGuard)
  @ApiOperation({ summary: 'deleteFlag' })
  /**
   * Primary Intent: Executes the deleteFlag use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async deleteFlag(@Param('id') id: string): Promise<void> {
    await this.deleteService.deleteFeatures(id);
  }
}
