// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InfrastructureRedisService } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/services/infrastructure-redis.service';
import { InfrastructureUptimeService } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/services/infrastructure-uptime.service';
import { InfrastructureApiHealthService } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/services/infrastructure-api-health.service';
import { SuperadminQueryDto } from '@/backend_superadmin/core/pagination/superadmin-query.dto';

@ApiTags('infrastructuretelemetryquery')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class InfrastructureTelemetryQueryController {
  constructor(private readonly redisService: InfrastructureRedisService, private readonly uptimeService: InfrastructureUptimeService, private readonly apiHealthService: InfrastructureApiHealthService) {}


  /** Executes GET /superadmin/system-ops/infrastructure/redis. */
  @ApiOperation({ summary: 'GET /superadmin/system-ops/infrastructure/redis' })
  // SLA: FAST
  @Get('superadmin/system-ops/infrastructure/redis')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async redis(@Query() query: SuperadminQueryDto): Promise<unknown> { return await this.redisService.findInfrastructureRedisTelemetry(); }


  /** Executes GET /superadmin/system-ops/infrastructure/uptime. */
  @ApiOperation({ summary: 'GET /superadmin/system-ops/infrastructure/uptime' })
  // SLA: FAST
  @Get('superadmin/system-ops/infrastructure/uptime')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  // SLA: FAST
  @Get('superadmin/system-ops/infrastructure/uptime-history')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async uptime(@Query() _query: SuperadminQueryDto): Promise<unknown> { return await this.uptimeService.findInfrastructureUptime(); }


  /** Executes GET /superadmin/system-ops/infrastructure/api-health. */
  @ApiOperation({ summary: 'GET /superadmin/system-ops/infrastructure/api-health' })
  // SLA: FAST
  @Get('superadmin/system-ops/infrastructure/api-health')
  @Get('api/superadmin/system-ops/infrastructure/api-health')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async apiHealth(@Query() _query: SuperadminQueryDto): Promise<unknown> { return await this.apiHealthService.findInfrastructureApiHealth(); }

}