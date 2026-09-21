// RESPONSIBILITY: Owns POST/PATCH/DELETE endpoints for the jobs feature; business logic stays in micro-services.
// FLOW: HTTP mutation -> DTO -> use-case service -> named repository mutation -> canonical response interceptor.
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { RateLimitGuard } from '@/backend_superadmin/core/cache/rate-limit.guard';
import { JobsCreateService } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/services/jobs-create.service';
import { JobsCreateDto } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/dtos/jobs-create.dto';
import { JobsUpdateService } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/services/jobs-update.service';
import { JobsUpdateDto } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/dtos/jobs-update.dto';
import { JobsDeleteService } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/services/jobs-delete.service';
import { JobsStatusService } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/services/jobs-status.service';

@ApiTags('jobs')
@Controller('/superadmin/system-ops/jobs')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class JobsCommandController {
  constructor(private readonly createService: JobsCreateService, private readonly updateService: JobsUpdateService, private readonly deleteService: JobsDeleteService, private readonly statusService: JobsStatusService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create jobs' })
  @Post()
    @HttpCode(HttpStatus.CREATED)
    @RequireIdempotencyKey()
  @UseGuards(RateLimitGuard)
    async create(@Body() body: JobsCreateDto): Promise<unknown> { return this.createService.createJobs(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update jobs' })
  @Patch(':id')
    @RequireIdempotencyKey()
  @UseGuards(RateLimitGuard)
    async update(@Param('id') id: string, @Body() body: JobsUpdateDto): Promise<unknown> { return this.updateService.updateJobs(id, body); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove jobs' })
  @Delete(':id')
    @UseGuards(RateLimitGuard)
    @RequireIdempotencyKey()
  @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteJobs(id); }

  /** Handles the changeStatus mutation for the feature. */
  @ApiOperation({ summary: 'changeStatus jobs' })
  @Patch(':id/status')
    @UseGuards(RateLimitGuard)
    async changeStatus(@Param('id') id: string, @Body() body: { status: string }): Promise<unknown> { return this.statusService.changeJobsStatus(id, body.status); }

}
