// RESPONSIBILITY: Provides test-only tenant lifecycle endpoints for isolated API E2E runs.
// FLOW: Pytest fixture -> authenticated test endpoint -> tenant provisioner -> isolated PostgreSQL database.
import { createHash } from 'node:crypto';

import { BadRequestException, Controller, Delete, Headers, Param, Post, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiCreatedResponse, ApiHeader, ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { LandingTestTenantDestroyResponseDto } from '@/backend_landing/landing_core/landing_tenant/landing-test-tenant-destroy-response.dto';
import { LandingTestTenantProvisionResponseDto } from '@/backend_landing/landing_core/landing_tenant/landing-test-tenant-provision-response.dto';
import { RequireIdempotencyKey } from '@/backend_landing/landing_core/landing_security/landing-require-idempotency-key.decorator';
import { LandingTenantDataSourceManagerService } from '@/backend_landing/landing_core/landing_tenant/landing-tenant-data-source-manager.service';
import { LandingTenantDatabaseProvisionerService } from '@/backend_landing/landing_core/landing_tenant/landing-tenant-database-provisioner.service';
import { LandingTestTenantIdempotencyService } from '@/backend_landing/landing_core/landing_tenant/landing-test-tenant-idempotency.service';
import { CORE_ERROR_MESSAGES } from '@/backend_landing/landing_core/landing_types/landing-core-error.constants';

/**
 * Intent: Expose disposable tenant provisioning only when the process explicitly runs in test mode.
 * Edge Cases: Any non-test environment or invalid bootstrap token receives 401 and no database operation occurs.
 * Side Effects: POST creates a real isolated PostgreSQL database; DELETE drops it after connections are closed.
 * AI Notes: These endpoints are infrastructure for Rule 43 E2E isolation and must never become production APIs.
 */
@ApiTags('test-infrastructure')
@Controller('test/tenants')
@RequireIdempotencyKey()
/**
 * Intent: Defines the landing test tenant controller boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs, unavailable infrastructure, and transaction failures must fail through the owning boundary instead of being silently ignored.
 * Side Effects: Performs only the persistence, orchestration, transport, or infrastructure effects explicitly owned by this class.
 * AI Notes: Preserve the class's current responsibility and dependency direction; do not move business logic across feature boundaries.
 */
export class LandingTestTenantController {
  
  /**
   * Intent: Preserve the single responsibility of landing-test-tenant.controller.constructor at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
constructor(
    private readonly config: ConfigService,
    private readonly provisioner: LandingTenantDatabaseProvisionerService,
    private readonly dataSourceManager: LandingTenantDataSourceManagerService,
    private readonly idempotency: LandingTestTenantIdempotencyService,
  ) {}

  /**
   * Intent: Provision a disposable real test tenant for one E2E test run.
   * Edge Cases: The operation is allowed only in test mode and requires the configured bootstrap token.
   * Side Effects: Creates a tenant registry row and logical PostgreSQL database, then runs tenant migrations.
   * AI Notes: Tests must extract the returned real UUID and use it for the complete lifecycle.
   */
  // SLA: HEAVY
  @Post()
  @ApiOperation({ summary: 'Provision a disposable isolated E2E tenant.' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiHeader({ name: 'x-test-bootstrap-token', required: true })
  @ApiCreatedResponse({ type: LandingTestTenantProvisionResponseDto })
  async provision(@Headers('x-test-bootstrap-token') token?: string, @Headers('idempotency-key') idempotencyKey?: string): Promise<{ tenantId: string }> {
    this.assertTestAccess(token);
    const normalizedIdempotencyKey = idempotencyKey!.trim();
    const requestHash = this.hashRequest({ operation: 'provision' });
    const cached = await this.idempotency.getCached('test-tenant.provision', normalizedIdempotencyKey, token!, requestHash);
    if (cached) return cached as { tenantId: string };
    const lockToken = await this.idempotency.acquire('test-tenant.provision', normalizedIdempotencyKey, token!);
    try {
      const tenant = await this.provisioner.provisionTestTenant();
      const response = { tenantId: tenant.id };
      try {
        await this.idempotency.store('test-tenant.provision', normalizedIdempotencyKey, token!, requestHash, response);
      } catch (error: unknown) {
        await this.dataSourceManager.destroy(tenant.id).catch(() => undefined);
        await this.provisioner.destroyTestTenant(tenant.id).catch(() => undefined);
        throw error;
      }
      return response;
    } finally {
      await this.idempotency.release('test-tenant.provision', normalizedIdempotencyKey, token!, lockToken);
    }
  }

  /**
   * Intent: Destroy a disposable test tenant after the test lifecycle completes.
   * Edge Cases: Unknown tenant IDs are treated as already destroyed by the provisioner.
   * Side Effects: Closes any cached tenant DataSource and drops the isolated PostgreSQL database.
   * AI Notes: Never call this path for production tenant offboarding.
   */
  // SLA: HEAVY
  @Delete(':tenantId')
  @ApiOperation({ summary: 'Destroy a disposable isolated E2E tenant.' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiHeader({ name: 'x-test-bootstrap-token', required: true })
  @ApiOkResponse({ type: LandingTestTenantDestroyResponseDto })
  async destroy(
    @Param('tenantId') tenantId: string,
    @Headers('x-test-bootstrap-token') token?: string,
    @Headers('idempotency-key') idempotencyKey?: string,
  ): Promise<{ destroyed: true }> {
    this.assertTestAccess(token);
    this.assertUuid(tenantId);
    const normalizedIdempotencyKey = idempotencyKey!.trim();
    const scope = 'test-tenant.destroy';
    const requestHash = this.hashRequest({ operation: 'destroy', tenantId });
    const cached = await this.idempotency.getCached(scope, normalizedIdempotencyKey, token!, requestHash);
    if (cached) return cached as { destroyed: true };
    const lockToken = await this.idempotency.acquire(scope, normalizedIdempotencyKey, token!);
    try {
      await this.dataSourceManager.destroy(tenantId);
      await this.provisioner.destroyTestTenant(tenantId);
      const response = { destroyed: true as const };
      await this.idempotency.store(scope, normalizedIdempotencyKey, token!, requestHash, response);
      return response;
    } finally {
      await this.idempotency.release(scope, normalizedIdempotencyKey, token!, lockToken);
    }
  }

  /** @description Hashes the canonical test lifecycle command identity so a reused key cannot change the operation or DELETE target. @param input - Canonical lifecycle command identity. @returns SHA-256 request fingerprint. */
  
  /**
   * Intent: Preserve the single responsibility of landing-test-tenant.controller.hashRequest at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
private hashRequest(input: unknown): string {
    return createHash('sha256').update(JSON.stringify(input)).digest('hex');
  }

  /** @description Validates that a cleanup identifier is a canonical UUID before master-database lookup. @param tenantId - Candidate tenant UUID. @returns Nothing. @throws BadRequestException when the identifier is malformed. */
  
  /**
   * Intent: Preserve the single responsibility of landing-test-tenant.controller.assertUuid at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
private assertUuid(tenantId: string): void {
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(tenantId)) {
      throw new BadRequestException({
        message: CORE_ERROR_MESSAGES.TEST_TENANT_INVALID_ID,
        error: 'INVALID_TENANT_ID',
        errorCode: 'CORE.TEST_TENANT.INVALID_ID',
      });
    }
  }

  /** @description Enforces test-only access using validated configuration rather than raw environment variables. @param token - Test bootstrap credential. @returns Nothing. @throws UnauthorizedException when access is not valid. */
  
  /**
   * Intent: Preserve the single responsibility of landing-test-tenant.controller.assertTestAccess at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
private assertTestAccess(token?: string): void {
    const nodeEnv = this.config.getOrThrow<string>('app.nodeEnv');
    const expected = this.config.get<string>('app.e2eBootstrapToken');
    if (nodeEnv !== 'test' || !expected || token !== expected) {
      throw new UnauthorizedException({
        message: CORE_ERROR_MESSAGES.TEST_TENANT_DISABLED,
        error: 'TEST_TENANT_DISABLED',
        errorCode: 'CORE.TEST_TENANT.DISABLED',
      });
    }
  }
}
