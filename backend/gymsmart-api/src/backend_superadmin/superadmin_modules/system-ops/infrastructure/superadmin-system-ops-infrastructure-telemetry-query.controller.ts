// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminInfrastructureRedisService } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/services/superadmin-system-ops-infrastructure-redis.service';
import { SuperadminInfrastructureUptimeService } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/services/superadmin-system-ops-infrastructure-uptime.service';
import { SuperadminInfrastructureApiHealthService } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/services/superadmin-system-ops-infrastructure-api-health.service';
import { SuperadminQueryDto } from '@/backend_superadmin/superadmin_core/pagination/superadmin-query.dto';

@ApiTags('infrastructuretelemetryquery')
@Controller()
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminInfrastructureTelemetryQueryController {
  constructor(private readonly redisService: SuperadminInfrastructureRedisService, private readonly uptimeService: SuperadminInfrastructureUptimeService, private readonly apiHealthService: SuperadminInfrastructureApiHealthService) {}


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