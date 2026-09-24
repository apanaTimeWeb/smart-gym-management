// RESPONSIBILITY: Exposes live/readiness/deep platform health probes for Kubernetes and internal operations.
// FLOW: Health route -> DB/Redis probes -> HTTP status.
import { Controller, Get, HttpStatus, ServiceUnavailableException, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { DataSource } from 'typeorm';
import { SuperadminCoreRedisService } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-redis.service';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { Public } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-public.decorator';

/**
 * Primary Intent: Defines SuperadminHealthController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('health')
@Controller('/health')
export class SuperadminHealthController {
  constructor(private readonly dataSource: DataSource, private readonly redis: SuperadminCoreRedisService) {}
/**
 * Primary Intent: Executes the live use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns process liveness without downstream dependency checks. */
  @Public()
  // SLA: FAST
  @Get('live')
  @ApiResponse({ status: HttpStatus.OK, description: 'Process liveness.' })
  @ApiOperation({ summary: 'live' })
  /**
   * Primary Intent: Executes the live use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  live(): { status: string } { return { status: 'ok' }; }
/**
 * Primary Intent: Executes the ready use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns readiness based on master DB and Redis reachability. */
  @Public()
  // SLA: FAST
  @Get('ready')
  @ApiResponse({ status: HttpStatus.OK, description: 'Dependency readiness.' })
  @ApiResponse({ status: HttpStatus.SERVICE_UNAVAILABLE, description: 'Dependencies unavailable.' })
  @ApiOperation({ summary: 'ready' })
  /**
   * Primary Intent: Executes the ready use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async ready(): Promise<{ status: string }> {
    try { await this.dataSource.query('SELECT 1'); await this.redis.ping(); return { status: 'ready' }; }
    catch { throw new ServiceUnavailableException({ error: 'SERVICE_UNAVAILABLE', errorCode: 'HEALTH.DEPENDENCIES.UNAVAILABLE', message: { key: 'health.ERRORS.DEPENDENCIES_UNAVAILABLE' } }); }
  }
/**
 * Primary Intent: Executes the deep use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Performs the full internal dependency-chain check; not exposed publicly. */
  @UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
  @Roles(SuperadminRole.SUPERADMIN)
  // SLA: FAST
  @Get('deep')
  @ApiResponse({ status: HttpStatus.OK, description: 'Deep dependency health.' })
  @ApiOperation({ summary: 'deep' })
  /**
   * Primary Intent: Executes the deep use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async deep(): Promise<{ status: string; dependencies: Record<string, string> }> {
    await this.dataSource.query('SELECT 1');
    const redis = await this.redis.ping();
    return { status: 'ok', dependencies: { postgres: 'ok', redis } };
  }
}
