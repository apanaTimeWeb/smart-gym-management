// RESPONSIBILITY: Persists the single authoritative backup schedule contract owned by the backups feature.
// FLOW: Controller -> SuperadminSystemOpsBackupsScheduleService -> SuperadminSystemOpsBackupsScheduleContractSnapshotRepository -> PostgreSQL.
import { BadRequestException, Injectable } from '@nestjs/common';
import { SuperadminSystemOpsBackupsScheduleDto } from '@/backend_superadmin/superadmin_modules/system-ops/backups/backups_dtos/superadmin-system-ops-backups-schedule.dto';
import type { SuperadminBackupsSchedulePayload } from '@/backend_superadmin/superadmin_modules/system-ops/backups/backups_types/superadmin-system-ops-backups.interfaces';
import { SuperadminSystemOpsBackupsScheduleContractSnapshotRepository } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups-schedule-contract-snapshot.repository';

/**
 * Primary Intent: Defines SuperadminSystemOpsBackupsScheduleService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminSystemOpsBackupsScheduleService {
  constructor(private readonly repository: SuperadminSystemOpsBackupsScheduleContractSnapshotRepository) {}
/**
 * Primary Intent: Executes the updateBackupsSchedule use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the updateBackupsSchedule use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async updateBackupsSchedule(body: SuperadminSystemOpsBackupsScheduleDto): Promise<SuperadminBackupsSchedulePayload> {
    if (!body.cronExpression?.trim() || body.retentionDays < 1) throw new BadRequestException({ error: 'BAD_REQUEST', errorCode: 'BACKUPS.SCHEDULE.INPUT_INVALID', message: { key: 'backups.ERRORS.BAD_REQUEST' } });
    const current = await this.repository.findLatest();
    const next: SuperadminBackupsSchedulePayload = { ...(current ?? { cronExpression: body.cronExpression, retentionDays: body.retentionDays, updatedAt: new Date().toISOString() }), ...body, updatedAt: new Date().toISOString() };
    await this.repository.upsert(next);
    return next;
  }

  /**
 * Primary Intent: Executes the `findBackupsSchedule` responsibility owned by this superadmin-system-ops-backups-schedule.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the findBackupsSchedule use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findBackupsSchedule(): Promise<SuperadminBackupsSchedulePayload | null> { return this.repository.findLatest(); }
}
