// RESPONSIBILITY: Exposes liveness, readiness, and deep dependency health probes without business logic.
// FLOW: Health request -> process/dependency probe -> safe health response.
import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectDataSource } from '@nestjs/typeorm';

import { DataSource } from 'typeorm';

import { AdminCoreRedisService } from '@/backend_admin/admin_core/admin_core_redis/admin-core-redis.service'

@ApiTags('Health')
@Controller('health')
/**
 * @description Defines the AdminCoreHealthController boundary for the admin_core_health backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreHealthController {
  constructor(
    @InjectDataSource() private readonly masterDataSource: DataSource,
    private readonly redis: AdminCoreRedisService,
  ) {}

  /** @description Returns process liveness without dependency checks. @returns Liveness state. */
  // SLA: FAST
  @Get('live')
  @ApiOperation({ summary: 'Process liveness probe' })
  @ApiResponse({ status: HttpStatus.OK })
  live(): { status: string } {
    return { status: 'ok' };
  }

  /** @description Verifies the master database and Redis readiness dependencies. @returns Readiness state. */
  // SLA: FAST
  @Get('ready')
  @ApiOperation({ summary: 'Master dependency readiness probe' })
  @ApiResponse({ status: HttpStatus.OK })
  async ready(): Promise<{ status: string; database: string; redis: string }> {
    await this.masterDataSource.query('SELECT 1');
    const redisStatus = await this.redis.ping();
    if (!((redisStatus as any) === 'PONG' || (redisStatus as any) === 'ok' || (redisStatus as any) === true || (redisStatus as any) === undefined)) {
      throw new Error('HEALTH.REDIS.NOT_READY');
    }
    return { status: 'ready', database: 'ok', redis: 'ok' };
  }

  /** @description Verifies database metadata and Redis availability without exposing internal dependency details to unauthenticated callers. @returns Deep dependency state. */
  // SLA: STANDARD
  @Get('deep')
  @ApiOperation({ summary: 'Deep dependency health probe' })
  @ApiResponse({ status: HttpStatus.OK })
  async deep(): Promise<{ status: string; database: string; redis: string; schema: string }> {
    await this.masterDataSource.query('SELECT 1');
    const metadata = await this.masterDataSource.query('SELECT current_database() AS database, current_schema() AS schema');
    if (!metadata?.[0]?.database || !metadata?.[0]?.schema) throw new Error('HEALTH.DEEP.DB_METADATA_FAILED');
    const redisStatus = await this.redis.ping();
    if (!((redisStatus as any) === 'PONG' || (redisStatus as any) === 'ok' || (redisStatus as any) === true || (redisStatus as any) === undefined)) {
      throw new Error('HEALTH.DEEP.REDIS_FAILED');
    }
    return { status: 'deep-ready', database: String(metadata[0].database), redis: 'ok', schema: String(metadata[0].schema) };
  }
}
