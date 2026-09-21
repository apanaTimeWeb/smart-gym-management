// RESPONSIBILITY: Exposes liveness, readiness, and deep dependency health probes without business logic.
// FLOW: Health request → master DB dependency check → probe response.

import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectDataSource } from '@nestjs/typeorm';
import { CoreRedisService } from '@/backend_admin/core/redis/core-redis.service';
import { DataSource } from 'typeorm';

@ApiTags('Health')
@Controller('health')
export class CoreHealthController {
  constructor(@InjectDataSource() private readonly masterDataSource: DataSource, private readonly redis: CoreRedisService) {}

  /** @description Returns process liveness without dependency checks. @returns Liveness state. */
  @Get('live')
  @ApiOperation({ summary: 'Process liveness probe' })
  @ApiResponse({ status: HttpStatus.OK })
  live(): { status: string } { return { status: 'ok' }; }

  /** @description Verifies the master database can execute a lightweight query. @returns Readiness state. */
  @Get('ready')
  @ApiOperation({ summary: 'Master database readiness probe' })
  @ApiResponse({ status: HttpStatus.OK })
  async ready(): Promise<{ status: string; database: string }> {
    await this.masterDataSource.query('SELECT 1');
    await this.redis.ping();
    return { status: 'ready', database: 'ok' };
  }

  /** @description Verifies the core master database dependency for a deep readiness probe. @returns Deep readiness state. */
  @Get('deep')
  @ApiOperation({ summary: 'Deep dependency health probe' })
  @ApiResponse({ status: HttpStatus.OK })
  async deep(): Promise<{ status: string; database: string }> {
    await this.masterDataSource.query('SELECT 1');
    await this.redis.ping();
    return { status: 'deep-ready', database: 'ok' };
  }
}
