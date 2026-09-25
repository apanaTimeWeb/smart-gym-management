// RESPONSIBILITY: Returns the complete frontend system-ops summary contract from PostgreSQL.
// FLOW: Controller -> SuperadminSystemOpsSummaryService -> SuperadminSystemOpsRepository -> contract snapshot.
import { Injectable, NotFoundException } from '@nestjs/common';
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
  async findSystemOpsSummary(): Promise<Awaited<ReturnType<SuperadminSystemOpsRepository['findSummary']>>> {
    const payload = await this.repository.findSummary();
    if (payload === null) throw new NotFoundException({ error: 'NOT_FOUND', errorCode: 'SYSTEM_OPS.SUMMARY.NOT_PROVISIONED', message: { key: 'system-ops.ERRORS.NOT_FOUND' } });
    return payload;
  }
}
