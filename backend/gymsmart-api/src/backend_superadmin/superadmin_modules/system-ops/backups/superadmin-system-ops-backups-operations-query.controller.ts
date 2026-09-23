// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminBackupsHealthService } from '@/backend_superadmin/superadmin_modules/system-ops/backups/services/superadmin-system-ops-backups-health.service';
import { SuperadminBackupsDownloadService } from '@/backend_superadmin/superadmin_modules/system-ops/backups/services/superadmin-system-ops-backups-download.service';
import { SuperadminBackupsScheduleService } from '@/backend_superadmin/superadmin_modules/system-ops/backups/services/superadmin-system-ops-backups-schedule.service';
import { SuperadminQueryDto } from '@/backend_superadmin/superadmin_core/pagination/superadmin-query.dto';

@ApiTags('backupsoperationsquery')
@Controller()
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminBackupsOperationsQueryController {
  constructor(private readonly healthService: SuperadminBackupsHealthService, private readonly downloadService: SuperadminBackupsDownloadService, private readonly scheduleService: SuperadminBackupsScheduleService) {}



  /** Returns the persisted backup schedule required by the frontend. */
  @ApiOperation({ summary: 'GET /superadmin/system-ops/backups/schedule' })
  // SLA: FAST
  @Get('superadmin/system-ops/backups/schedule')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async schedule(): Promise<unknown> { return await this.scheduleService.findBackupsSchedule(); }

  /** Executes GET /superadmin/system-ops/backups/health. */
  @ApiOperation({ summary: 'GET /superadmin/system-ops/backups/health' })
  // SLA: HEAVY
  @Get('superadmin/system-ops/backups/health')
  @Get('api/superadmin/system-ops/backups/health')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async health(@Query() query: SuperadminQueryDto): Promise<unknown> { return await this.healthService.findBackupsHealth({ query }); }


  /** Executes GET /superadmin/system-ops/backups/:id/download. */
  @ApiOperation({ summary: 'GET /superadmin/system-ops/backups/:id/download' })
  // SLA: HEAVY
  @Get('superadmin/system-ops/backups/:id/download')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async download(@Param('id') id: string): Promise<unknown> { return await this.downloadService.findBackupsDownload(id); }

}