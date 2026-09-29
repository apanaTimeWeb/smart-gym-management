// RESPONSIBILITY: Exposes liveness, readiness, and protected deep dependency health checks.
// FLOW: Health request -> LandingHealthController -> LandingHealthService -> dependency status -> canonical envelope.
import { Controller, Get, Headers, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiHeader, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { LandingHealthService } from '@/backend_landing/landing_core/landing_health/landing-health.service';
import { CORE_ERROR_MESSAGES } from '@/backend_landing/landing_core/landing_types/landing-core-error.constants';

/**
 * Intent: Provide operational health signals with separate fast and dependency-heavy checks.
 * Edge Cases: Deep checks require a configured secret and intentionally return 404 on unauthorized probes.
 * Side Effects: Read-only dependency probes; no business mutation.
 * AI Notes: Keep health endpoints independent from business feature routes and do not add mutation requirements.
 */
@ApiTags('health')
@Controller('health')
/**
 * Intent: Defines the landing health controller boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs, unavailable infrastructure, and transaction failures must fail through the owning boundary instead of being silently ignored.
 * Side Effects: Performs only the persistence, orchestration, transport, or infrastructure effects explicitly owned by this class.
 * AI Notes: Preserve the class's current responsibility and dependency direction; do not move business logic across feature boundaries.
 */
export class LandingHealthController {
  
  /**
   * Intent: Preserve the single responsibility of landing-health.controller.constructor at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
constructor(
    private readonly health: LandingHealthService,
    private readonly config: ConfigService,
  ) {}

  /**
   * Intent: Confirm the process is alive without waiting on external dependencies.
   * Edge Cases: This must remain fast even when databases or Redis are unavailable.
   * Side Effects: None.
   * AI Notes: Suitable for Kubernetes liveness checks.
   */
  // SLA: FAST
  @Get('live')
  @ApiOperation({ summary: 'Return process liveness.' })
  @ApiOkResponse({ schema: { example: { success: true, message: 'Request completed successfully.', data: { status: 'ok' } } } })
  getLive(): { status: 'ok' } {
    return this.health.checkLive();
  }

  /**
   * Intent: Confirm master database and Redis dependencies are reachable.
   * Edge Cases: Any required dependency failure is surfaced through the canonical error filter.
   * Side Effects: Performs read-only health probes.
   * AI Notes: Suitable for readiness checks and should not mutate application state.
   */
  // SLA: STANDARD
  @Get('ready')
  @ApiOperation({ summary: 'Return dependency readiness.' })
  @ApiOkResponse({ schema: { example: { success: true, message: 'Request completed successfully.', data: { status: 'ok', postgres: 'up', redis: 'up' } } } })
  async getReady(): Promise<{ status: 'ok'; postgres: 'up'; redis: 'up' }> {
    return this.health.checkReady();
  }

  /**
   * Intent: Run the deepest dependency check, including resolution of the configured public tenant database.
   * Edge Cases: Missing/incorrect probe token returns 404 to avoid revealing health endpoint existence to unauthorized callers.
   * Side Effects: Opens short-lived dependency connections through existing infrastructure managers.
   * AI Notes: Never log or return the health secret.
   */
  // SLA: HEAVY
  @Get('deep')
  @ApiOperation({ summary: 'Run protected deep dependency health check.' })
  @ApiHeader({ name: 'x-health-deep-token', required: true })
  @ApiOkResponse({ schema: { example: { success: true, message: 'Request completed successfully.', data: { status: 'ok', postgres: 'up', redis: 'up', tenantDatabase: 'up' } } } })
  @ApiNotFoundResponse({ schema: { example: { success: false, message: 'Not Found', data: null, error: 'HTTP_ERROR', errorCode: 'CORE.HTTP.REQUEST_FAILED', statusCode: HttpStatus.NOT_FOUND } } })
  async getDeep(@Headers('x-health-deep-token') token?: string): Promise<{ status: 'ok'; postgres: 'up'; redis: 'up'; tenantDatabase: 'up' }> {
    if (token !== this.config.getOrThrow<string>('landing.healthDeepToken')) {
      throw new HttpException({
        message: CORE_ERROR_MESSAGES.HEALTH_DEEP_NOT_FOUND,
        error: 'HEALTH_NOT_FOUND',
        errorCode: 'CORE.HEALTH.NOT_FOUND',
      }, HttpStatus.NOT_FOUND);
    }
    return this.health.checkDeep();
  }
}
