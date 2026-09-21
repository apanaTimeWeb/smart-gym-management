// RESPONSIBILITY: Exposes liveness, readiness and authenticated deep health probes for container orchestration.
// FLOW: Health probe -> CoreHealthController -> PostgreSQL/Redis dependency checks -> health result.

import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';

import { CoreRedisService } from '@/core/cache/core-redis.service';
import { TIMEOUT_CONFIG } from '@/core/config/timeout.config';
import { CoreSla, CoreSlaCategory } from '@/core/http/core-sla.decorator';
import { CorePublic } from '@/core/security/core-public.decorator';

import type { HealthCheckResult } from '@nestjs/terminus';
@ApiTags('Health')
@Controller('health')
export class CoreHealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly database: TypeOrmHealthIndicator,
    private readonly redis: CoreRedisService,
  ) {}

  @Get('live')
  @CorePublic()
  @ApiOperation({ summary: 'Process liveness probe.' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Process is alive.' })
  @CoreSla(CoreSlaCategory.FAST)
  // SLA: FAST
  @HealthCheck()
  live(): Promise<HealthCheckResult> {
    return this.health.check([]);
  }

  @Get('ready')
  @CorePublic()
  @ApiOperation({ summary: 'Dependency readiness probe.' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Database and Redis are reachable.' })
  @CoreSla(CoreSlaCategory.STANDARD)
  // SLA: STANDARD
  @HealthCheck()
  ready(): Promise<HealthCheckResult> {
    return this.health.check([
      () => this.database.pingCheck('postgres', { timeout: TIMEOUT_CONFIG.DB_QUERY_DEFAULT_MS }),
      async () => ({ redis: (await this.redis.ping()) === 'PONG' ? { status: 'up' } : { status: 'down' } }),
    ]);
  }

  @Get('deep')
  @ApiOperation({ summary: 'Authenticated deep dependency health probe.' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Deep dependency chain is reachable.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Authentication is required.' })
  @CoreSla(CoreSlaCategory.STANDARD)
  // SLA: STANDARD
  @HealthCheck()
  deep(): Promise<HealthCheckResult> {
    return this.health.check([
      () => this.database.pingCheck('postgres', { timeout: TIMEOUT_CONFIG.DB_QUERY_DEFAULT_MS }),
      async () => ({ redis: (await this.redis.ping()) === 'PONG' ? { status: 'up' } : { status: 'down' } }),
    ]);
  }
}
