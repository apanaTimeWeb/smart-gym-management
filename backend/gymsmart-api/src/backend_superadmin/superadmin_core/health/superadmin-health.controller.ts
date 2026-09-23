// RESPONSIBILITY: Exposes live/readiness/deep platform health probes for Kubernetes and internal operations.
// FLOW: Health route -> DB/Redis probes -> HTTP status.
import { Controller, Get, HttpStatus, ServiceUnavailableException, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DataSource } from 'typeorm';
import { SuperadminRedisService } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-redis.service';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { Public } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-public.decorator';

@ApiTags('health')
@Controller('/health')
export class SuperadminHealthController {
  constructor(private readonly dataSource: DataSource, private readonly redis: SuperadminRedisService) {}

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
  @UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
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