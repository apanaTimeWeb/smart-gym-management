// RESPONSIBILITY: Owns the command HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/body -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-idempotency.decorator';
import { SuperadminSystemOpsInfrastructureFlushTenantDto } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/infrastructure_dtos/superadmin-system-ops-infrastructure-flush-tenant.dto';
import { SuperadminSystemOpsInfrastructureFlushGlobalService } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/infrastructure_services/superadmin-system-ops-infrastructure-flush-global.service';
import { SuperadminSystemOpsInfrastructureFlushTenantService } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/infrastructure_services/superadmin-system-ops-infrastructure-flush-tenant.service';

/**
 * Primary Intent: Defines SuperadminSystemOpsInfrastructureCacheCommandController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('infrastructurecachecommand')
@Controller()
@UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminSystemOpsInfrastructureCacheCommandController {
  constructor(private readonly flushGlobalService: SuperadminSystemOpsInfrastructureFlushGlobalService, private readonly flushTenantService: SuperadminSystemOpsInfrastructureFlushTenantService) {}
/**
 * Primary Intent: Executes the flushGlobal use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Executes POST /superadmin/system-ops/infrastructure/redis/flush-global. */
  @ApiOperation({ summary: 'POST /superadmin/system-ops/infrastructure/redis/flush-global' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('api/superadmin/system-ops/infrastructure/redis/flush-global')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @ApiOperation({ summary: 'flushGlobal' })
  /**
   * Primary Intent: Executes the flushGlobal use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async flushGlobal(): Promise<Awaited<ReturnType<SuperadminSystemOpsInfrastructureFlushGlobalService['flushGlobalCache']>>> { return await this.flushGlobalService.flushGlobalCache(); }
/**
 * Primary Intent: Executes the flushTenant use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Executes POST /superadmin/system-ops/infrastructure/redis/flush-tenant. */
  @ApiOperation({ summary: 'POST /superadmin/system-ops/infrastructure/redis/flush-tenant' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
@Post('api/superadmin/system-ops/infrastructure/redis/flush-tenant')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @ApiOperation({ summary: 'flushTenant' })
  /**
   * Primary Intent: Executes the flushTenant use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async flushTenant(@Body() body: SuperadminSystemOpsInfrastructureFlushTenantDto): Promise<Awaited<ReturnType<SuperadminSystemOpsInfrastructureFlushTenantService['flushTenantCache']>>> { return await this.flushTenantService.flushTenantCache(body.tenantIds); }

}
