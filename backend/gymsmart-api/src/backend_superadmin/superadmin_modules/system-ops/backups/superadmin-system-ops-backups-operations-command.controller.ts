// RESPONSIBILITY: Owns backup schedule, trigger, and restore HTTP commands.
// FLOW: HTTP command -> DTO -> owning service -> durable job -> Redis worker.
import { Body, Controller, HttpCode, HttpStatus, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-idempotency.decorator';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { SuperadminSystemOpsBackupsScheduleDto } from '@/backend_superadmin/superadmin_modules/system-ops/backups/backups_dtos/superadmin-system-ops-backups-schedule.dto';
import { SuperadminSystemOpsBackupsTriggerDto } from '@/backend_superadmin/superadmin_modules/system-ops/backups/backups_dtos/superadmin-system-ops-backups-trigger.dto';
import { SuperadminSystemOpsBackupsScheduleService } from '@/backend_superadmin/superadmin_modules/system-ops/backups/backups_services/superadmin-system-ops-backups-schedule.service';
import { SuperadminSystemOpsBackupsTriggerService } from '@/backend_superadmin/superadmin_modules/system-ops/backups/backups_services/superadmin-system-ops-backups-trigger.service';
import { SuperadminSystemOpsBackupsRestoreService } from '@/backend_superadmin/superadmin_modules/system-ops/backups/backups_services/superadmin-system-ops-backups-restore.service';
import type { Response } from 'express';

/**
 * Primary Intent: Defines SuperadminSystemOpsBackupsOperationsCommandController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('backupsoperationscommand')
@Controller()
@UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminSystemOpsBackupsOperationsCommandController {
  constructor(private readonly scheduleService:SuperadminSystemOpsBackupsScheduleService,private readonly triggerService:SuperadminSystemOpsBackupsTriggerService,private readonly restoreService:SuperadminSystemOpsBackupsRestoreService){}
/**
 * Primary Intent: Executes the patchSchedule use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Updates the persisted backup schedule. */
  // SLA: HEAVY
  // SLA: STANDARD
  @Patch('superadmin/system-ops/backups/schedule')
  @RequireIdempotencyKey()
  @ApiResponse({status:HttpStatus.OK,description:'Backup schedule updated.'})
  @ApiOperation({ summary: 'patchSchedule' })
  /**
   * Primary Intent: Executes the patchSchedule use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async patchSchedule(@Body() body: SuperadminSystemOpsBackupsScheduleDto): Promise<Awaited<ReturnType<SuperadminSystemOpsBackupsScheduleService['updateBackupsSchedule']>>> {
    return this.scheduleService.updateBackupsSchedule(body);
  }
/**
 * Primary Intent: Executes the trigger use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Starts real backup work asynchronously and immediately returns its durable job identifiers. */
  // SLA: STANDARD
  @Post('superadmin/system-ops/backups/trigger')
  @RequireIdempotencyKey()
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponse({status:HttpStatus.ACCEPTED,description:'Backup snapshot job(s) queued. The Location header points to the durable job resource; the canonical data payload remains null for frontend compatibility.'})
  @ApiOperation({ summary: 'trigger' })
  /**
   * Primary Intent: Executes the trigger use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async trigger(@Body() body:SuperadminSystemOpsBackupsTriggerDto,@Res({passthrough:true}) response:Response):Promise<null>{ const result=await this.triggerService.triggerBackup(body); response.setHeader('Location',result.statusUrl); response.setHeader('X-Job-Ids',result.jobIds.join(',')); return null; }
/**
 * Primary Intent: Executes the restore use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Starts a destructive restore asynchronously and immediately returns its durable job identifier. */
  // SLA: HEAVY
  // SLA: STANDARD
  @Post('superadmin/system-ops/backups/:id/restore')
  @RequireIdempotencyKey()
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponse({status:HttpStatus.ACCEPTED,description:'Backup restore job queued. The Location header points to the durable job status resource; the canonical data payload remains null for frontend compatibility.'})
  @ApiOperation({ summary: 'restore' })
  /**
   * Primary Intent: Executes the restore use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async restore(@Param('id') id:string,@Res({passthrough:true}) response:Response):Promise<null>{ const result=await this.restoreService.restoreBackup(id); response.setHeader('Location',result.statusUrl); return null; }
}
