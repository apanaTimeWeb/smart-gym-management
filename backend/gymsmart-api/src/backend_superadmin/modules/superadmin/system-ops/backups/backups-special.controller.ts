// RESPONSIBILITY: Owns explicitly versioned/specialized frontend contract endpoints for the backups feature.
// FLOW: HTTP -> specialized micro-service -> typed result -> canonical response interceptor.
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { BackupsHealthResponseDto } from '@/backend_superadmin/modules/superadmin/system-ops/backups/backups-health-response.dto';
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { BackupsHealthService } from '@/backend_superadmin/modules/superadmin/system-ops/backups/services/backups-health.service';
import { BackupsScheduleService } from '@/backend_superadmin/modules/superadmin/system-ops/backups/services/backups-schedule.service';
import { BackupsTriggerService } from '@/backend_superadmin/modules/superadmin/system-ops/backups/services/backups-trigger.service';
import { BackupsDownloadService } from '@/backend_superadmin/modules/superadmin/system-ops/backups/services/backups-download.service';
import { BackupsRestoreService } from '@/backend_superadmin/modules/superadmin/system-ops/backups/services/backups-restore.service';

@ApiTags('backups-special')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class BackupsSpecialController {
  constructor(private readonly healthService: BackupsHealthService, private readonly scheduleService: BackupsScheduleService, private readonly triggerService: BackupsTriggerService, private readonly downloadService: BackupsDownloadService, private readonly restoreService: BackupsRestoreService) {}

  /** Executes GET /superadmin/system-ops/backups/health. */
  @ApiOperation({ summary: 'GET /superadmin/system-ops/backups/health' })
  @Get('superadmin/system-ops/backups/health')
  async health(@Query() query: Record<string, string>): Promise<unknown> { return await this.healthService.findBackupsHealth(); }

  /** Executes POST /superadmin/system-ops/backups/schedule. */
  @RequireIdempotencyKey()
  @ApiOperation({ summary: 'POST /superadmin/system-ops/backups/schedule' })
  @Post('superadmin/system-ops/backups/schedule')
  async schedule(@Body() body: Record<string, unknown>): Promise<unknown> { return await this.scheduleService.updateBackupsSchedule(body); }

  /** Executes POST /superadmin/system-ops/backups/trigger. */
  @RequireIdempotencyKey()
  @ApiOperation({ summary: 'POST /superadmin/system-ops/backups/trigger' })
  @Post('superadmin/system-ops/backups/trigger')
  async trigger(@Body() body: Record<string, unknown>): Promise<unknown> { return await this.triggerService.triggerBackup(body); }

  /** Executes GET /superadmin/system-ops/backups/:id/download. */
  @ApiOperation({ summary: 'GET /superadmin/system-ops/backups/:id/download' })
  @Get('superadmin/system-ops/backups/:id/download')
  async download(@Param('id') id: string): Promise<unknown> { return await this.downloadService.findBackupsDownload(id); }

  /** Executes POST /superadmin/system-ops/backups/:id/restore. */
  @RequireIdempotencyKey()
  @ApiOperation({ summary: 'POST /superadmin/system-ops/backups/:id/restore' })
  @Post('superadmin/system-ops/backups/:id/restore')
  async restore(@Param('id') id: string, @Body() body: Record<string, unknown>): Promise<unknown> { return await this.restoreService.restoreBackup(id); }

}
