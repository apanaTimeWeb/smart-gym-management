// RESPONSIBILITY: Owns explicitly versioned/specialized frontend contract endpoints for the infrastructure feature.
// FLOW: HTTP -> specialized micro-service -> typed result -> canonical response interceptor.
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import type { InfrastructureApiHealthResponseDto } from '@/modules/superadmin/system-ops/infrastructure/infrastructure-api-health-response.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { InfrastructureRedisService } from '@/modules/superadmin/system-ops/infrastructure/services/infrastructure-redis.service';
import { InfrastructureUptimeService } from '@/modules/superadmin/system-ops/infrastructure/services/infrastructure-uptime.service';
import { InfrastructureFlushGlobalService } from '@/modules/superadmin/system-ops/infrastructure/services/infrastructure-flush-global.service';
import { InfrastructureFlushTenantService } from '@/modules/superadmin/system-ops/infrastructure/services/infrastructure-flush-tenant.service';
import { InfrastructureApiHealthService } from '@/modules/superadmin/system-ops/infrastructure/services/infrastructure-api-health.service';

@ApiTags('infrastructure-special')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class InfrastructureSpecialController {
  constructor(private readonly redisService: InfrastructureRedisService, private readonly uptimeService: InfrastructureUptimeService, private readonly flushGlobalService: InfrastructureFlushGlobalService, private readonly flushTenantService: InfrastructureFlushTenantService, private readonly apiHealthService: InfrastructureApiHealthService) {}

  /** Executes GET /superadmin/system-ops/infrastructure/redis. */
  @ApiOperation({ summary: 'GET /superadmin/system-ops/infrastructure/redis' })
  @Get('superadmin/system-ops/infrastructure/redis')
  async redis(@Query() query: Record<string, string>): Promise<unknown> { return await this.redisService.findInfrastructureRedisTelemetry(); }

  /** Executes GET /superadmin/system-ops/infrastructure/uptime. */
  @ApiOperation({ summary: 'GET /superadmin/system-ops/infrastructure/uptime' })
  @Get('superadmin/system-ops/infrastructure/uptime')
  async uptime(@Query() query: Record<string, string>): Promise<unknown> { return await this.uptimeService.findInfrastructureUptime(); }

  /** Executes POST /superadmin/system-ops/infrastructure/redis/flush-global. */
  @ApiOperation({ summary: 'POST /superadmin/system-ops/infrastructure/redis/flush-global' })
  @Post('superadmin/system-ops/infrastructure/redis/flush-global')
  async flushGlobal(@Body() body: Record<string, unknown>): Promise<unknown> { return await this.flushGlobalService.flushGlobalCache(); }

  /** Executes POST /superadmin/system-ops/infrastructure/redis/flush-tenant. */
  @ApiOperation({ summary: 'POST /superadmin/system-ops/infrastructure/redis/flush-tenant' })
  @Post('superadmin/system-ops/infrastructure/redis/flush-tenant')
  async flushTenant(@Body() body: Record<string, unknown>): Promise<unknown> { return await this.flushTenantService.flushTenantCache(Array.isArray(body.tenantIds) ? body.tenantIds.filter((value): value is string => typeof value === 'string') : []); }

  /** Executes GET /superadmin/system-ops/infrastructure/api-health. */
  @ApiOperation({ summary: 'GET /superadmin/system-ops/infrastructure/api-health' })
  @Get('superadmin/system-ops/infrastructure/api-health')
  async apiHealth(@Query() query: Record<string, string>): Promise<unknown> { return await this.apiHealthService.findInfrastructureApiHealth(); }
}
