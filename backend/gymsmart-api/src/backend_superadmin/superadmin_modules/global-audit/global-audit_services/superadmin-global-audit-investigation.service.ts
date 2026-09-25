// RESPONSIBILITY: Builds investigation data from the authoritative audit_logs table; no seeded snapshot is used.
// FLOW: Controller -> SuperadminGlobalAuditInvestigationService -> SuperadminGlobalAuditRepository -> PostgreSQL audit_logs.
import { Injectable } from '@nestjs/common';
import { SuperadminGlobalAuditInvestigationResponseDto } from '@/backend_superadmin/superadmin_modules/global-audit/superadmin-global-audit-investigation-response.dto';
import { SuperadminGlobalAuditRepository } from '@/backend_superadmin/superadmin_modules/global-audit/superadmin-global-audit.repository';

/**
 * Primary Intent: Defines SuperadminGlobalAuditInvestigationService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminGlobalAuditInvestigationService {
  constructor(private readonly repository: SuperadminGlobalAuditRepository) {}
/**
 * Primary Intent: Executes the findGlobalAuditInvestigation use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Builds the investigation view from the most recent audit entries. */
  async findGlobalAuditInvestigation(input: { query?: { page?: number; limit?: number }; page?: number; limit?: number } = {}): Promise<SuperadminGlobalAuditInvestigationResponseDto> {
    const page = await this.repository.findPage({ page: input.query?.page ?? input.page ?? 1, limit: Math.min(input.query?.limit ?? input.limit ?? 100, 200), sortBy: 'createdAt', sortOrder: 'DESC' });
    const filters = [...new Set(page.items.flatMap((row) => [row.actorRole, row.action, row.entityType]))].slice(0, 50);
    const changes = page.items.slice(0, 100).map((row) => ({ time: row.createdAt.toISOString(), actor: row.actorId, action: row.action, resource: row.entityType, before: JSON.stringify(row.oldValue ?? null), after: JSON.stringify(row.newValue ?? null), risk: 'UNCLASSIFIED' }));
    return { changes, anomalies: [], filters };
  }
}
