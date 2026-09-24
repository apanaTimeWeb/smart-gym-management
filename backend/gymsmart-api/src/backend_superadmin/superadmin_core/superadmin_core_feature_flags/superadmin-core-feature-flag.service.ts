// RESPONSIBILITY: Evaluates persisted Superadmin feature flags dynamically for a tenant without environment-variable branching.
// FLOW: Business caller -> SuperadminCoreFeatureFlagService -> master DataSource -> superadmin_feature_flags.
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import type { DataSource } from 'typeorm';

/**
 * Primary Intent: Defines SuperadminCoreFeatureFlagService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminCoreFeatureFlagService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
/**
 * Primary Intent: Executes the isEnabled use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the isEnabled use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async isEnabled(featureName: string, tenantId: string): Promise<boolean> {
    const rows = await this.dataSource.query(
      `SELECT is_global_enabled, enabled_tenant_ids
         FROM superadmin_feature_flags
        WHERE name = $1 AND deleted_at IS NULL
        ORDER BY updated_at DESC
        LIMIT 1`,
      [featureName],
    ) as Array<{ is_global_enabled: boolean; enabled_tenant_ids: unknown }>;
    const row = rows[0];
    if (!row) return false;
    if (row.is_global_enabled) return true;
    if (!Array.isArray(row.enabled_tenant_ids)) return false;
    return row.enabled_tenant_ids.some((value) => value === tenantId);
  }
}
