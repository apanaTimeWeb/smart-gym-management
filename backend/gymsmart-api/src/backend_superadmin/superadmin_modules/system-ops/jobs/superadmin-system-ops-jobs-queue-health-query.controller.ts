// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJobsQueueHealthService } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/services/superadmin-system-ops-jobs-queue-health.service';
import { SuperadminQueryDto } from '@/backend_superadmin/superadmin_core/pagination/superadmin-query.dto';

@ApiTags('jobsqueuehealthquery')
@Controller()
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminJobsQueueHealthQueryController {
  constructor(private readonly queueHealthService: SuperadminJobsQueueHealthService) {}


  /** Executes GET /superadmin/system-ops/jobs/queue-health. */
  @ApiOperation({ summary: 'GET /superadmin/system-ops/jobs/queue-health' })
  // SLA: FAST
  @Get('superadmin/system-ops/jobs/queue-health')
  @Get('api/superadmin/system-ops/jobs/queue-health')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async queueHealth(@Query() query: SuperadminQueryDto): Promise<unknown> { void query; return await this.queueHealthService.findJobsQueueHealth(); }

}