// RESPONSIBILITY: Exposes live/readiness/deep platform health probes for Kubernetes and internal operations.
// FLOW: Health route -> DB/Redis probes -> HTTP status.
import { Controller, Get, HttpStatus, ServiceUnavailableException, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DataSource } from 'typeorm';
import { RedisService } from '@/backend_superadmin/core/cache/redis.service';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { Public } from '@/backend_superadmin/core/auth/public.decorator';

@ApiTags('health')
@Controller('/health')
export class HealthController {
  constructor(private readonly dataSource: DataSource, private readonly redis: RedisService) {}

  /** Returns process liveness without downstream dependency checks. */
  @Public()
  // SLA: FAST
  @Get('live')
  @ApiResponse({ status: HttpStatus.OK, description: 'Process liveness.' })
  live(): { status: string } { return { status: 'ok' }; }

  /** Returns readiness based on master DB and Redis reachability. */
  @Public()
  // SLA: FAST
  @Get('ready')
  @ApiResponse({ status: HttpStatus.OK, description: 'Dependency readiness.' })
  @ApiResponse({ status: HttpStatus.SERVICE_UNAVAILABLE, description: 'Dependencies unavailable.' })
  async ready(): Promise<{ status: string }> {
    try { await this.dataSource.query('SELECT 1'); await this.redis.ping(); return { status: 'ready' }; }
    catch { throw new ServiceUnavailableException({ error: 'SERVICE_UNAVAILABLE', errorCode: 'HEALTH.DEPENDENCIES.UNAVAILABLE', message: { key: 'health.ERRORS.DEPENDENCIES_UNAVAILABLE' } }); }
  }

  /** Performs the full internal dependency-chain check; not exposed publicly. */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(SuperadminRole.SUPERADMIN)
  // SLA: FAST
  @Get('deep')
  @ApiResponse({ status: HttpStatus.OK, description: 'Deep dependency health.' })
  async deep(): Promise<{ status: string; dependencies: Record<string, string> }> {
    await this.dataSource.query('SELECT 1');
    const redis = await this.redis.ping();
    return { status: 'ok', dependencies: { postgres: 'ok', redis } };
  }
}