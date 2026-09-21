// RESPONSIBILITY: Owns explicitly versioned/specialized frontend contract endpoints for the jobs feature.
// FLOW: HTTP -> specialized micro-service -> typed result -> canonical response interceptor.
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { JobsQueueHealthResponseDto } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/jobs-queue-health-response.dto';
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { JobsQueueHealthService } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/services/jobs-queue-health.service';
import { JobsRetryAllService } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/services/jobs-retry-all.service';
import { JobsRetryService } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/services/jobs-retry.service';
import { JobsCancelService } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/services/jobs-cancel.service';
import { JobsClearCompletedService } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/services/jobs-clear-completed.service';
import { JobsBulkRetryService } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/services/jobs-bulk-retry.service';
import { JobsBulkDeleteService } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/services/jobs-bulk-delete.service';

@ApiTags('jobs-special')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class JobsSpecialController {
  constructor(private readonly queueHealthService: JobsQueueHealthService, private readonly retryAllService: JobsRetryAllService, private readonly retryService: JobsRetryService, private readonly cancelService: JobsCancelService, private readonly clearCompletedService: JobsClearCompletedService, private readonly bulkRetryService: JobsBulkRetryService, private readonly bulkDeleteService: JobsBulkDeleteService) {}

  /** Executes GET /superadmin/system-ops/jobs/queue-health. */
  @ApiOperation({ summary: 'GET /superadmin/system-ops/jobs/queue-health' })
  @Get('superadmin/system-ops/jobs/queue-health')
  async queueHealth(@Query() query: Record<string, string>): Promise<unknown> { return await this.queueHealthService.findJobsQueueHealth(); }

  /** Executes POST /superadmin/system-ops/jobs/retry-all. */
  @RequireIdempotencyKey()
  @ApiOperation({ summary: 'POST /superadmin/system-ops/jobs/retry-all' })
  @Post('superadmin/system-ops/jobs/retry-all')
  async retryAll(@Body() body: Record<string, unknown>): Promise<unknown> { return await this.retryAllService.retryAllJobs(); }

  /** Executes POST /superadmin/system-ops/jobs/:id/retry. */
  @RequireIdempotencyKey()
  @ApiOperation({ summary: 'POST /superadmin/system-ops/jobs/:id/retry' })
  @Post('superadmin/system-ops/jobs/:id/retry')
  async retry(@Param('id') id: string, @Body() body: Record<string, unknown>): Promise<unknown> { return await this.retryService.retryJob(id); }

  /** Executes POST /superadmin/system-ops/jobs/:id/cancel. */
  @RequireIdempotencyKey()
  @ApiOperation({ summary: 'POST /superadmin/system-ops/jobs/:id/cancel' })
  @Post('superadmin/system-ops/jobs/:id/cancel')
  async cancel(@Param('id') id: string, @Body() body: Record<string, unknown>): Promise<unknown> { return await this.cancelService.cancelJob(id); }

  /** Executes POST /superadmin/system-ops/jobs/clear-completed. */
  @RequireIdempotencyKey()
  @ApiOperation({ summary: 'POST /superadmin/system-ops/jobs/clear-completed' })
  @Post('superadmin/system-ops/jobs/clear-completed')
  async clearCompleted(@Body() body: Record<string, unknown>): Promise<unknown> { return await this.clearCompletedService.clearCompletedJobs(); }

  /** Executes POST /superadmin/system-ops/jobs/bulk-retry. */
  @RequireIdempotencyKey()
  @ApiOperation({ summary: 'POST /superadmin/system-ops/jobs/bulk-retry' })
  @Post('superadmin/system-ops/jobs/bulk-retry')
  async bulkRetry(@Body() body: Record<string, unknown>): Promise<unknown> { return await this.bulkRetryService.bulkRetryJobs(body); }

  /** Executes POST /superadmin/system-ops/jobs/bulk-delete. */
  @RequireIdempotencyKey()
  @ApiOperation({ summary: 'POST /superadmin/system-ops/jobs/bulk-delete' })
  @Post('superadmin/system-ops/jobs/bulk-delete')
  async bulkDelete(@Body() body: Record<string, unknown>): Promise<unknown> { return await this.bulkDeleteService.bulkDeleteJobs(body); }

}
