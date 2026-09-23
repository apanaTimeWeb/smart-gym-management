// RESPONSIBILITY: Owns the command HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/body -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-idempotency.decorator';
import { SuperadminJobsBulkActionDto } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/dtos/superadmin-system-ops-jobs-bulk-action.dto';
import { SuperadminJobsRetryAllService } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/services/superadmin-system-ops-jobs-retry-all.service';
import { SuperadminJobsRetryService } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/services/superadmin-system-ops-jobs-retry.service';
import { SuperadminJobsCancelService } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/services/superadmin-system-ops-jobs-cancel.service';
import { SuperadminJobsClearCompletedService } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/services/superadmin-system-ops-jobs-clear-completed.service';
import { SuperadminJobsBulkRetryService } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/services/superadmin-system-ops-jobs-bulk-retry.service';
import { SuperadminJobsBulkDeleteService } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/services/superadmin-system-ops-jobs-bulk-delete.service';

@ApiTags('jobsbulkcommand')
@Controller()
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminJobsBulkCommandController {
  constructor(private readonly retryAllService: SuperadminJobsRetryAllService, private readonly retryService: SuperadminJobsRetryService, private readonly cancelService: SuperadminJobsCancelService, private readonly clearCompletedService: SuperadminJobsClearCompletedService, private readonly bulkRetryService: SuperadminJobsBulkRetryService, private readonly bulkDeleteService: SuperadminJobsBulkDeleteService) {}


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
  async bulkRetry(@Body() body: SuperadminJobsBulkActionDto): Promise<unknown> { return await this.bulkRetryService.bulkRetryJobs(body); }


  /** Executes POST /superadmin/system-ops/jobs/bulk-delete. */
  @ApiOperation({ summary: 'POST /superadmin/system-ops/jobs/bulk-delete' })
  @RequireIdempotencyKey()
  // SLA: HEAVY
  @Post('superadmin/system-ops/jobs/bulk-delete')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async bulkDelete(@Body() body: SuperadminJobsBulkActionDto): Promise<unknown> { return await this.bulkDeleteService.bulkDeleteJobs(body); }

}