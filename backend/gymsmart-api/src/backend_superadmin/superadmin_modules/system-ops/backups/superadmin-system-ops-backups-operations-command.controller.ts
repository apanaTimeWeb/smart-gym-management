// RESPONSIBILITY: Owns the command HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/body -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-idempotency.decorator';
import { SuperadminBackupsScheduleDto } from '@/backend_superadmin/superadmin_modules/system-ops/backups/dtos/superadmin-system-ops-backups-schedule.dto';
import { SuperadminBackupsTriggerDto } from '@/backend_superadmin/superadmin_modules/system-ops/backups/dtos/superadmin-system-ops-backups-trigger.dto';
import { SuperadminBackupsScheduleService } from '@/backend_superadmin/superadmin_modules/system-ops/backups/services/superadmin-system-ops-backups-schedule.service';
import { SuperadminBackupsTriggerService } from '@/backend_superadmin/superadmin_modules/system-ops/backups/services/superadmin-system-ops-backups-trigger.service';
import { SuperadminBackupsRestoreService } from '@/backend_superadmin/superadmin_modules/system-ops/backups/services/superadmin-system-ops-backups-restore.service';

@ApiTags('backupsoperationscommand')
@Controller()
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminBackupsOperationsCommandController {
  constructor(private readonly scheduleService: SuperadminBackupsScheduleService, private readonly triggerService: SuperadminBackupsTriggerService, private readonly restoreService: SuperadminBackupsRestoreService) {}



  /** Implements the frontend PATCH backup schedule contract. */
  @ApiOperation({ summary: 'PATCH /superadmin/system-ops/backups/schedule' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch('superadmin/system-ops/backups/schedule')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async patchSchedule(@Body() body: SuperadminBackupsScheduleDto): Promise<unknown> { return await this.scheduleService.updateBackupsSchedule(body); }

  /** Executes POST /superadmin/system-ops/backups/schedule. */
  @ApiOperation({ summary: 'POST /superadmin/system-ops/backups/schedule' })
  @RequireIdempotencyKey()
  // SLA: HEAVY
  @Post('superadmin/system-ops/backups/schedule')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async schedule(@Body() body: SuperadminBackupsScheduleDto): Promise<unknown> { return await this.scheduleService.updateBackupsSchedule(body); }


  /** Executes POST /superadmin/system-ops/backups/trigger. */
  @ApiOperation({ summary: 'POST /superadmin/system-ops/backups/trigger' })
  @RequireIdempotencyKey()
  // SLA: HEAVY
  @Post('superadmin/system-ops/backups/trigger')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async trigger(@Body() body: SuperadminBackupsTriggerDto): Promise<unknown> { return await this.triggerService.triggerBackup(body); }


  /** Executes POST /superadmin/system-ops/backups/:id/restore. */
  @ApiOperation({ summary: 'POST /superadmin/system-ops/backups/:id/restore' })
  @RequireIdempotencyKey()
  // SLA: HEAVY
  @Post('superadmin/system-ops/backups/:id/restore')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async restore(@Param('id') id: string): Promise<unknown> { return await this.restoreService.restoreBackup(id); }

}