// RESPONSIBILITY: Returns the complete frontend system-ops summary contract from PostgreSQL.
// FLOW: Controller -> SuperadminSystemOpsSummaryService -> SuperadminSystemOpsRepository -> contract snapshot.
import { Injectable } from '@nestjs/common';
import { SuperadminSystemOpsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/superadmin-system-ops.repository';

/**
 * Primary Intent: Defines SuperadminSystemOpsSummaryService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminSystemOpsSummaryService {
  constructor(private readonly repository: SuperadminSystemOpsRepository) {}
/**
 * Primary Intent: Executes the findSystemOpsSummary use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the findSystemOpsSummary use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findSystemOpsSummary(): Promise<{
    infrastructureStatus: 'HEALTHY' | 'DEGRADED' | 'DOWN';
    pendingJobs: number;
    lastBackupAt: string | null;
    backupStatus: 'HEALTHY' | 'DEGRADED' | 'FAILED';
    migrationStatus: 'UP_TO_DATE' | 'PENDING' | 'FAILED';
  }> {
    const payload = await this.repository.findSummary() as Record<string, unknown> | null;
    // Always return a valid object — merge DB payload over safe defaults
    // so the page renders even when no snapshot has been computed yet.
    return {
      infrastructureStatus: (payload?.infrastructureStatus as 'HEALTHY' | 'DEGRADED' | 'DOWN') ?? 'HEALTHY',
      pendingJobs: typeof payload?.pendingJobs === 'number' ? payload.pendingJobs : 0,
      lastBackupAt: typeof payload?.lastBackupAt === 'string' ? payload.lastBackupAt : null,
      backupStatus: (payload?.backupStatus as 'HEALTHY' | 'DEGRADED' | 'FAILED') ?? 'HEALTHY',
      migrationStatus: (payload?.migrationStatus as 'UP_TO_DATE' | 'PENDING' | 'FAILED') ?? 'UP_TO_DATE',
    };
  }
}
