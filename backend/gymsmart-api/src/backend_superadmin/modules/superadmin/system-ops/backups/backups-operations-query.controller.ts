// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BackupsHealthService } from '@/backend_superadmin/modules/superadmin/system-ops/backups/services/backups-health.service';
import { BackupsDownloadService } from '@/backend_superadmin/modules/superadmin/system-ops/backups/services/backups-download.service';
import { BackupsScheduleService } from '@/backend_superadmin/modules/superadmin/system-ops/backups/services/backups-schedule.service';
import { SuperadminQueryDto } from '@/backend_superadmin/core/pagination/superadmin-query.dto';

@ApiTags('backupsoperationsquery')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class BackupsOperationsQueryController {
  constructor(private readonly healthService: BackupsHealthService, private readonly downloadService: BackupsDownloadService, private readonly scheduleService: BackupsScheduleService) {}



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