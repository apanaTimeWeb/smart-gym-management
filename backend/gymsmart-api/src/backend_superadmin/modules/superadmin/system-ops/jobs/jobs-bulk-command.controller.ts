// RESPONSIBILITY: Owns the command HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/body -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { JobsBulkActionDto } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/dtos/jobs-bulk-action.dto';
import { JobsRetryAllService } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/services/jobs-retry-all.service';
import { JobsRetryService } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/services/jobs-retry.service';
import { JobsCancelService } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/services/jobs-cancel.service';
import { JobsClearCompletedService } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/services/jobs-clear-completed.service';
import { JobsBulkRetryService } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/services/jobs-bulk-retry.service';
import { JobsBulkDeleteService } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/services/jobs-bulk-delete.service';

@ApiTags('jobsbulkcommand')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class JobsBulkCommandController {
  constructor(private readonly retryAllService: JobsRetryAllService, private readonly retryService: JobsRetryService, private readonly cancelService: JobsCancelService, private readonly clearCompletedService: JobsClearCompletedService, private readonly bulkRetryService: JobsBulkRetryService, private readonly bulkDeleteService: JobsBulkDeleteService) {}


  /** Executes POST /superadmin/system-ops/jobs/retry-all. */
  @ApiOperation({ summary: 'POST /superadmin/system-ops/jobs/retry-all' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('superadmin/system-ops/jobs/retry-all')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async retryAll(): Promise<unknown> { return await this.retryAllService.retryAllJobs(); }


  /** Executes POST /superadmin/system-ops/jobs/:id/retry. */
  @ApiOperation({ summary: 'POST /superadmin/system-ops/jobs/:id/retry' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('superadmin/system-ops/jobs/:id/retry')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async retry(@Param('id') id: string): Promise<unknown> { return await this.retryService.retryJob(id); }


  /** Executes POST /superadmin/system-ops/jobs/:id/cancel. */
  @ApiOperation({ summary: 'POST /superadmin/system-ops/jobs/:id/cancel' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('superadmin/system-ops/jobs/:id/cancel')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async cancel(@Param('id') id: string): Promise<unknown> { return await this.cancelService.cancelJob(id); }


  /** Executes POST /superadmin/system-ops/jobs/clear-completed. */
  @ApiOperation({ summary: 'POST /superadmin/system-ops/jobs/clear-completed' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('superadmin/system-ops/jobs/clear-completed')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async clearCompleted(): Promise<unknown> { return await this.clearCompletedService.clearCompletedJobs(); }


  /** Executes POST /superadmin/system-ops/jobs/bulk-retry. */
  @ApiOperation({ summary: 'POST /superadmin/system-ops/jobs/bulk-retry' })
  @RequireIdempotencyKey()
  // SLA: HEAVY
  @Post('superadmin/system-ops/jobs/bulk-retry')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async bulkRetry(@Body() body: JobsBulkActionDto): Promise<unknown> { return await this.bulkRetryService.bulkRetryJobs(body); }


  /** Executes POST /superadmin/system-ops/jobs/bulk-delete. */
  @ApiOperation({ summary: 'POST /superadmin/system-ops/jobs/bulk-delete' })
  @RequireIdempotencyKey()
  // SLA: HEAVY
  @Post('superadmin/system-ops/jobs/bulk-delete')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async bulkDelete(@Body() body: JobsBulkActionDto): Promise<unknown> { return await this.bulkDeleteService.bulkDeleteJobs(body); }

}