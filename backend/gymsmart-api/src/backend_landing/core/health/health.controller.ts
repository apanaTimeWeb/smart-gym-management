// RESPONSIBILITY: Exposes health endpoints with the required liveness/readiness/deep separation.
// FLOW: Health request â†’ HealthController â†’ HealthService â†’ dependency status.
import { Controller, Get, Headers, HttpException, HttpStatus } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import { HealthService } from '@/backend_landing/core/health/health.service';


@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthService,
    private readonly config: ConfigService,
  ) {}

  // SLA: FAST
  @Get('live')
  getLive(): { status: 'ok' } {
    return this.health.checkLive();
  }

  // SLA: FAST
  @Get('ready')
  async getReady(): Promise<{ status: 'ok'; postgres: 'up'; redis: 'up' }> {
    return this.health.checkReady();
  }

  // SLA: STANDARD
  @Get('deep')
  /** @description Runs the dependency-heavy health check behind the validated deep health secret. @param token - Configured health probe token. @returns Deep dependency status. */
  async getDeep(@Headers('x-health-deep-token') token?: string): Promise<{ status: 'ok'; postgres: 'up'; redis: 'up'; tenantDatabase: 'up' }> {
    if (token !== this.config.getOrThrow<string>('app.healthDeepToken')) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return this.health.checkDeep();
  }
}
