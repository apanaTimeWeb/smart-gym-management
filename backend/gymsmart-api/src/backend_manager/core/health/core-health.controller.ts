// RESPONSIBILITY: Owns backend core HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { DataSource } from 'typeorm';

import { CorePublicDecorator } from '@/backend_manager/core/auth/core-public.decorator';
import { CoreRedisService } from '@/backend_manager/core/database/core-redis.service';

interface CoreDependencyHealth {
  database: boolean;
  redis: boolean;
}

@ApiTags('Health')
@Controller('health')
export class CoreHealthController {
  constructor(private readonly dataSource: DataSource, private readonly redis: CoreRedisService) {}

  /**
   * @description Returns the process liveness status without checking downstream dependencies.
   * @returns HTTP process liveness payload.
   */
  @Get('live')
  @CorePublicDecorator()
  @ApiOperation({ summary: 'Liveness probe' })
  @ApiResponse({ status: HttpStatus.OK })
  live(): { status: 'ok' } {
    return { status: 'ok' };
  }

  /**
   * @description Checks whether required database and Redis dependencies are reachable for traffic.
   * @returns Readiness state and dependency checks.
   */
  @Get('ready')
  @CorePublicDecorator()
  @ApiOperation({ summary: 'Readiness probe' })
  @ApiResponse({ status: HttpStatus.OK })
  async ready(): Promise<{ status: 'ok' | 'degraded'; dependencies: CoreDependencyHealth }> {
    const dependencies = await this.checkDependencies();
    const ready = dependencies.database && dependencies.redis;
    return { status: ready ? 'ok' : 'degraded', dependencies };
  }

  /**
   * @description Performs the protected deep dependency chain check used by operators.
   * @returns Deep health state and dependency checks.
   */
  @Get('deep')
  @ApiOperation({ summary: 'Deep health probe' })
  @ApiResponse({ status: HttpStatus.OK })
  async deep(): Promise<{ status: 'ok' | 'degraded'; dependencies: CoreDependencyHealth }> {
    const dependencies = await this.checkDependencies();
    const healthy = dependencies.database && dependencies.redis;
    return { status: healthy ? 'ok' : 'degraded', dependencies };
  }

  /**
   * @description Performs bounded dependency probes without exposing internal connection details.
   * @returns Boolean health state for each required dependency.
   */
  private async checkDependencies(): Promise<CoreDependencyHealth> {
    const [database, redis] = await Promise.all([this.checkDatabase(), this.redis.isReady()]);
    return { database, redis };
  }

  /**
   * @description Verifies master database reachability using a read-only query.
   * @returns True when the database query succeeds.
   */
  private async checkDatabase(): Promise<boolean> {
    try {
      await this.dataSource.query('SELECT 1');
      return true;
    } catch {
      return false;
    }
  }
}
