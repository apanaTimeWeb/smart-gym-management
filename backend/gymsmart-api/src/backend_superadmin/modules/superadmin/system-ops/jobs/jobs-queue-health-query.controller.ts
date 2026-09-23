// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JobsQueueHealthService } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/services/jobs-queue-health.service';
import { SuperadminQueryDto } from '@/backend_superadmin/core/pagination/superadmin-query.dto';

@ApiTags('jobsqueuehealthquery')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class JobsQueueHealthQueryController {
  constructor(private readonly queueHealthService: JobsQueueHealthService) {}


  /** Executes GET /superadmin/system-ops/jobs/queue-health. */
  @ApiOperation({ summary: 'GET /superadmin/system-ops/jobs/queue-health' })
  // SLA: FAST
  @Get('superadmin/system-ops/jobs/queue-health')
  @Get('api/superadmin/system-ops/jobs/queue-health')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async queueHealth(@Query() query: SuperadminQueryDto): Promise<unknown> { void query; return await this.queueHealthService.findJobsQueueHealth(); }

}