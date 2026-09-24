// RESPONSIBILITY: Returns current tenant usage-meter rows from PostgreSQL.
// FLOW: Controller -> SuperadminUsageMetersMainService -> SuperadminUsageMetersRepository -> response.
import { Injectable } from '@nestjs/common';
import { SuperadminUsageMetersRepository } from '@/backend_superadmin/superadmin_modules/usage-meters/superadmin-usage-meters.repository';
import type { SuperadminUsageMetersListQuery } from '@/backend_superadmin/superadmin_modules/usage-meters/usage-meters_types/superadmin-usage-meters.interfaces';

/**
 * Primary Intent: Defines SuperadminUsageMetersMainService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminUsageMetersMainService {
  constructor(private readonly repository: SuperadminUsageMetersRepository) {}
/**
 * Primary Intent: Executes the findUsageMetersData use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the findUsageMetersData use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findUsageMetersData(input: Record<string, unknown> = {}): Promise<Record<string, unknown>> {
    const raw = input.query as Record<string, string> | undefined;
    const query: SuperadminUsageMetersListQuery = { page: Number(raw?.page ?? 1), limit: Math.min(Number(raw?.limit ?? 50), 100), search: raw?.search, tenantId: raw?.tenantId, sortBy: (raw?.sortBy ?? 'createdAt') as never, sortOrder: raw?.sortOrder === 'ASC' ? 'ASC' : 'DESC' };
    const result = await this.repository.findPage(query);
    return { data: result.items.map((item) => ({ id: item.id, tenantId: item.tenantId, tenantName: item.tenantName, smsSent: item.smsSent, smsLimit: item.smsLimit, whatsappMessagesSent: item.whatsappMessagesSent, whatsappLimit: item.whatsappLimit, emailsSent: item.emailsSent, emailLimit: item.emailLimit, apiCallsCount: item.apiCallsCount, apiCallsLimit: item.apiCallsLimit, databaseGb: item.databaseGb, mediaGb: item.mediaGb, storageLimitGb: item.storageLimitGb, activeMembers: item.activeMembers, totalMembers: item.totalMembers, memberLimit: item.memberLimit, staffCount: item.staffCount, staffLimit: item.staffLimit, billingCycleEnd: item.billingCycleEnd.toISOString() })), meta: { page: query.page, limit: query.limit, total: result.total, totalPages: Math.ceil(result.total / query.limit) } };
  }
}
