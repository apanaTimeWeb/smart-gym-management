// RESPONSIBILITY: Owns HTTP transport for the jobs-command.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { SuperadminJobsStatusDto } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/dtos/superadmin-system-ops-jobs-status.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminRateLimitGuard } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-rate-limit.guard';
import { SuperadminJobsCreateService } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/services/superadmin-system-ops-jobs-create.service';
import { SuperadminJobsCreateDto } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/dtos/superadmin-system-ops-jobs-create.dto';
import { SuperadminJobsUpdateService } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/services/superadmin-system-ops-jobs-update.service';
import { SuperadminJobsUpdateDto } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/dtos/superadmin-system-ops-jobs-update.dto';
import { SuperadminJobsDeleteService } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/services/superadmin-system-ops-jobs-delete.service';
import { SuperadminJobsStatusService } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/services/superadmin-system-ops-jobs-status.service';

@ApiTags('jobs')
@Controller('/superadmin/system-ops/jobs')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminJobsCommandController {
  constructor(private readonly createService: SuperadminJobsCreateService, private readonly updateService: SuperadminJobsUpdateService, private readonly deleteService: SuperadminJobsDeleteService, private readonly statusService: SuperadminJobsStatusService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create jobs' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Successful response.' })
    @HttpCode(HttpStatus.CREATED)
  @UseGuards(SuperadminRateLimitGuard)
    async create(@Body() body: SuperadminJobsCreateDto): Promise<unknown> { return this.createService.createJobs(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update jobs' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @UseGuards(SuperadminRateLimitGuard)
    async update(@Param('id') id: string, @Body() body: SuperadminJobsUpdateDto): Promise<unknown> { return this.updateService.updateJobs(id, body); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove jobs' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(SuperadminRateLimitGuard)
  @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteJobs(id); }

  /** Handles the changeStatus mutation for the feature. */
  @ApiOperation({ summary: 'changeStatus jobs' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id/status')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(SuperadminRateLimitGuard)
    async changeStatus(@Param('id') id: string, @Body() body: SuperadminJobsStatusDto): Promise<unknown> { return this.statusService.changeJobsStatus(id, body.status); }

}
