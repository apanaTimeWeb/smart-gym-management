// RESPONSIBILITY: Owns the command HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/body -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { BackupsScheduleDto } from '@/backend_superadmin/modules/backend_superadmin/system-ops/backups/dtos/backups-schedule.dto';
import { BackupsTriggerDto } from '@/backend_superadmin/modules/backend_superadmin/system-ops/backups/dtos/backups-trigger.dto';
import { BackupsScheduleService } from '@/backend_superadmin/modules/backend_superadmin/system-ops/backups/services/backups-schedule.service';
import { BackupsTriggerService } from '@/backend_superadmin/modules/backend_superadmin/system-ops/backups/services/backups-trigger.service';
import { BackupsRestoreService } from '@/backend_superadmin/modules/backend_superadmin/system-ops/backups/services/backups-restore.service';

@ApiTags('backupsoperationscommand')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class BackupsOperationsCommandController {
  constructor(private readonly scheduleService: BackupsScheduleService, private readonly triggerService: BackupsTriggerService, private readonly restoreService: BackupsRestoreService) {}



  /** Implements the frontend PATCH backup schedule contract. */
  @ApiOperation({ summary: 'PATCH /superadmin/system-ops/backups/schedule' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch('superadmin/system-ops/backups/schedule')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async patchSchedule(@Body() body: BackupsScheduleDto): Promise<unknown> { return await this.scheduleService.updateBackupsSchedule(body); }

  /** Executes POST /superadmin/system-ops/backups/schedule. */
  @ApiOperation({ summary: 'POST /superadmin/system-ops/backups/schedule' })
  @RequireIdempotencyKey()
  // SLA: HEAVY
  @Post('superadmin/system-ops/backups/schedule')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async schedule(@Body() body: BackupsScheduleDto): Promise<unknown> { return await this.scheduleService.updateBackupsSchedule(body); }


  /** Executes POST /superadmin/system-ops/backups/trigger. */
  @ApiOperation({ summary: 'POST /superadmin/system-ops/backups/trigger' })
  @RequireIdempotencyKey()
  // SLA: HEAVY
  @Post('superadmin/system-ops/backups/trigger')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async trigger(@Body() body: BackupsTriggerDto): Promise<unknown> { return await this.triggerService.triggerBackup(body); }


  /** Executes POST /superadmin/system-ops/backups/:id/restore. */
  @ApiOperation({ summary: 'POST /superadmin/system-ops/backups/:id/restore' })
  @RequireIdempotencyKey()
  // SLA: HEAVY
  @Post('superadmin/system-ops/backups/:id/restore')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async restore(@Param('id') id: string): Promise<unknown> { return await this.restoreService.restoreBackup(id); }

}