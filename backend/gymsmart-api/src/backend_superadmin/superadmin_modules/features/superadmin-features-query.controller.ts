// RESPONSIBILITY: Owns HTTP transport for the features-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { SuperadminFeaturesQueryDto } from '@/backend_superadmin/superadmin_modules/features/features_dtos/superadmin-features-query.dto';
import { SuperadminFeaturesListService } from '@/backend_superadmin/superadmin_modules/features/features_services/superadmin-features-list.service';
import { SuperadminFeaturesFindService } from '@/backend_superadmin/superadmin_modules/features/features_services/superadmin-features-find.service';
import { SuperadminFeaturesRepository } from '@/backend_superadmin/superadmin_modules/features/superadmin-features.repository';
import { SuperadminFeaturesResponseDto } from '@/backend_superadmin/superadmin_modules/features/features_responses/superadmin-features-response.dto';
import { SuperadminFeaturesHistoryEntryDto } from '@/backend_superadmin/superadmin_modules/features/superadmin-features-history-entry.dto';

/**
 * Primary Intent: Defines SuperadminFeaturesQueryController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('features')
@Controller()
@UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminFeaturesQueryController {
  constructor(private readonly listService: SuperadminFeaturesListService, private readonly findService: SuperadminFeaturesFindService, private readonly repository: SuperadminFeaturesRepository) {}
/**
 * Primary Intent: Executes the history use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns the audit history for one feature flag. */
  // SLA: FAST
  @Get(['superadmin/features/flags/:id/history', 'superadmin/features/flags/:id/history'])
  @ApiResponse({ type: [SuperadminFeaturesHistoryEntryDto] })
  @ApiOperation({ summary: 'history' })
  /**
   * Primary Intent: Executes the history use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async history(@Param('id') id: string): Promise<SuperadminFeaturesHistoryEntryDto[]> { const flag = await this.repository.findByIdOrThrow(id); return (Array.isArray(flag.history) ? flag.history : []) as unknown as SuperadminFeaturesHistoryEntryDto[]; }
/**
 * Primary Intent: Executes the findOne use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns one features record. */
  // SLA: FAST
  @Get(['superadmin/features/:id', 'superadmin/features/:id'])
  @ApiResponse({ type: SuperadminFeaturesResponseDto })
  @ApiOperation({ summary: 'findOne' })
  /**
   * Primary Intent: Executes the findOne use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findOne(@Param('id') id: string): Promise<SuperadminFeaturesResponseDto> { return await this.findService.findFeaturesById(id); }
}
