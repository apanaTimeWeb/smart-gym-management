// RESPONSIBILITY: Owns frontend-compatible /api/gyms mutation routes; all state changes require idempotency.
// FLOW: HTTP mutation -> IdempotencyKey -> guards -> owning Gym service -> repository/job -> canonical response.
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-idempotency.decorator';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { SuperadminCoreRateLimitGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-rate-limit.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { SuperadminGymsCreateDto } from '@/backend_superadmin/superadmin_modules/gyms/gyms_dtos/superadmin-gyms-create.dto';
import { SuperadminGymsUpdateDto } from '@/backend_superadmin/superadmin_modules/gyms/gyms_dtos/superadmin-gyms-update.dto';
import { SuperadminTenantStatusDto } from '@/backend_superadmin/superadmin_modules/gyms/gyms_dtos/superadmin-gyms-status.dto';
import { SuperadminGymsProvisionDto } from '@/backend_superadmin/superadmin_modules/gyms/gyms_dtos/superadmin-gyms-provision.dto';
import { SuperadminGymsOwnerEmailDto } from '@/backend_superadmin/superadmin_modules/gyms/gyms_dtos/superadmin-gyms-owner-email.dto';
import { SuperadminGymsResponseDto } from '@/backend_superadmin/superadmin_modules/gyms/gyms_responses/superadmin-gyms-response.dto';
import { SuperadminGymsExportQueuedResponseDto, SuperadminGymsExportDownloadResponseDto } from '@/backend_superadmin/superadmin_modules/gyms/gyms_responses/superadmin-gyms-export-job-status-response.dto';
import { SuperadminGymsCreateService } from '@/backend_superadmin/superadmin_modules/gyms/gyms_services/superadmin-gyms-create.service';
import { SuperadminGymsUpdateService } from '@/backend_superadmin/superadmin_modules/gyms/gyms_services/superadmin-gyms-update.service';
import { SuperadminGymsDeleteService } from '@/backend_superadmin/superadmin_modules/gyms/gyms_services/superadmin-gyms-delete.service';
import { SuperadminTenantStatusService } from '@/backend_superadmin/superadmin_modules/gyms/gyms_services/superadmin-gyms-status.service';
import { SuperadminGymsProvisionService } from '@/backend_superadmin/superadmin_modules/gyms/gyms_services/superadmin-gyms-provision.service';
import { SuperadminGymsOperationalService } from '@/backend_superadmin/superadmin_modules/gyms/gyms_services/superadmin-gyms-operational.service';
/**
 * Primary Intent: Defines SuperadminGymsApiCommandController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('gyms-api')
@Controller()
@UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminGymsApiCommandController {
  constructor(
    private readonly createService: SuperadminGymsCreateService,
    private readonly updateService: SuperadminGymsUpdateService,
    private readonly deleteService: SuperadminGymsDeleteService,
    private readonly statusService: SuperadminTenantStatusService,
    private readonly provisionService: SuperadminGymsProvisionService,
    private readonly operationalService: SuperadminGymsOperationalService,
  ) {}
/**
 * Primary Intent: Executes the provision use case within the owning backend feature boundary. Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them. AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */
  /** Provisions a new isolated tenant. */
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('api/gyms/provision')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(SuperadminCoreRateLimitGuard)
  @ApiResponse({ status: HttpStatus.CREATED, type: SuperadminGymsResponseDto })
  @ApiOperation({ summary: 'provision' })
  /**
   * Primary Intent: Executes the provision use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async provision(@Body() body: SuperadminGymsProvisionDto): Promise<SuperadminGymsResponseDto> {
    return this.provisionService.provisionGym(body);
  }
/**
 * Primary Intent: Executes the create use case within the owning backend feature boundary. Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them. AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */
  /** Creates a tenant through the canonical service. */
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('api/gyms')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(SuperadminCoreRateLimitGuard)
  @ApiResponse({ status: HttpStatus.CREATED, type: SuperadminGymsResponseDto })
  @ApiOperation({ summary: 'create' })
  /**
   * Primary Intent: Executes the create use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async create(@Body() body: SuperadminGymsCreateDto): Promise<SuperadminGymsResponseDto> {
    return this.createService.createGyms(body);
  }
/**
 * Primary Intent: Executes the update use case within the owning backend feature boundary. Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them. AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */
  /** Updates a tenant through the canonical service. */
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch('api/gyms/:id')
  @UseGuards(SuperadminCoreRateLimitGuard)
  @ApiResponse({ status: HttpStatus.OK, type: SuperadminGymsResponseDto })
  @ApiOperation({ summary: 'update' })
  /**
   * Primary Intent: Executes the update use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async update(@Param('id') id: string, @Body() body: SuperadminGymsUpdateDto): Promise<SuperadminGymsResponseDto> {
    return this.updateService.updateGyms(id, body);
  }
/**
 * Primary Intent: Executes the changeStatus use case within the owning backend feature boundary. Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them. AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */
  /** Changes tenant lifecycle status. */
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch('api/gyms/:id/status')
  @UseGuards(SuperadminCoreRateLimitGuard)
  @ApiResponse({ status: HttpStatus.OK, type: SuperadminGymsResponseDto })
  @ApiOperation({ summary: 'changeStatus' })
  /**
   * Primary Intent: Executes the changeStatus use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async changeStatus(@Param('id') id: string, @Body() body: SuperadminTenantStatusDto): Promise<SuperadminGymsResponseDto> {
    return this.statusService.changeTenantStatus(id, body.status);
  }
/**
 * Primary Intent: Executes the remove use case within the owning backend feature boundary. Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them. AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */
  /** Soft-deletes a tenant. */
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete('api/gyms/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(SuperadminCoreRateLimitGuard)
  @ApiResponse({ status: HttpStatus.OK, description: 'Tenant soft-deleted.' })
  @ApiOperation({ summary: 'remove' })
  /**
   * Primary Intent: Executes the remove use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteGyms(id); }
/**
 * Primary Intent: Executes the emailOwner use case within the owning backend feature boundary. Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them. AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */
  /** Sends an owner email command through the operational service. */
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('api/gyms/:id/email')
  @UseGuards(SuperadminCoreRateLimitGuard)
  @ApiResponse({ status: HttpStatus.OK, description: 'Owner message accepted.' })
  @ApiOperation({ summary: 'emailOwner' })
  /**
   * Primary Intent: Executes the emailOwner use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async emailOwner(@Param('id') id: string, @Body() body: SuperadminGymsOwnerEmailDto): Promise<null> {
    return this.operationalService.emailOwner(id, body.subject, body.message);
  }
/**
 * Primary Intent: Executes the impersonate use case within the owning backend feature boundary. Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them. AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */
  /** Issues a short-lived impersonation artifact tied to the authenticated actor and tenant. */
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('api/gyms/:id/impersonate')
  @UseGuards(SuperadminCoreRateLimitGuard)
  @ApiResponse({ status: HttpStatus.OK, description: 'Impersonation artifact issued.' })
  @ApiOperation({ summary: 'impersonate' })
  /**
   * Primary Intent: Executes the impersonate use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async impersonate(@Param('id') id: string): Promise<{ token: string }> { return this.operationalService.impersonate(id); }
}
