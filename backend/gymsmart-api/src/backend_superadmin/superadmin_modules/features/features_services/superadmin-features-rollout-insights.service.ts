// RESPONSIBILITY: Projects persisted feature flags and release notes into live rollout insights.
// FLOW: Rollout insights query -> SuperadminFeaturesRolloutInsightsService -> SuperadminFeaturesRepository + SuperadminFeaturesReleaseNoteRepository.
import { Injectable } from '@nestjs/common';
import { SuperadminFeaturesRolloutInsightsResponseDto } from '@/backend_superadmin/superadmin_modules/features/superadmin-features-rollout-insights-response.dto';
import { SuperadminFeaturesRepository } from '@/backend_superadmin/superadmin_modules/features/superadmin-features.repository';
import { SuperadminFeaturesReleaseNoteRepository } from '@/backend_superadmin/superadmin_modules/features/superadmin-features-release-note.repository';

/**
 * Primary Intent: Defines SuperadminFeaturesRolloutInsightsService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminFeaturesRolloutInsightsService {
  constructor(private readonly repository: SuperadminFeaturesRepository, private readonly releaseNotes: SuperadminFeaturesReleaseNoteRepository) {}
/**
 * Primary Intent: Executes the findFeaturesRolloutInsights use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the findFeaturesRolloutInsights use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findFeaturesRolloutInsights(): Promise<SuperadminFeaturesRolloutInsightsResponseDto> {
    const [flags, notes] = await Promise.all([this.repository.findActiveFeatureFlags(), this.releaseNotes.findAll()]);
    const rollouts = flags.map((flag) => {
      const tenantIds = Array.isArray(flag.enabledTenantIds) ? flag.enabledTenantIds.filter((value): value is string => typeof value === 'string') : [];
      const rollout = flag.isGlobalEnabled ? 100 : Math.min(100, tenantIds.length);
      return { feature: flag.name, rollout, target: flag.isGlobalEnabled ? 'ALL_TENANTS' : `${tenantIds.length} TENANTS`, status: flag.isGlobalEnabled || tenantIds.length ? 'ENABLED' : 'DISABLED', health: flag.isGlobalEnabled || tenantIds.length ? 100 : 0 };
    });
    const releases = notes.slice(0, 50).map((note) => ({ version: note.version, date: note.date.toISOString(), summary: note.content, impact: note.isPublished ? 'PUBLISHED' : 'DRAFT' }));
    const rollback = flags.map((flag) => {
      const history = Array.isArray(flag.history) ? flag.history.filter((value): value is Record<string, unknown> => Boolean(value) && typeof value === 'object') : [];
      const rollbackEntry = [...history].reverse().find((entry) => /rollback/i.test(String(entry.action ?? '')));
      const healthyEntry = [...history].reverse().find((entry) => /healthy/i.test(String(entry.action ?? '')));
      return { feature: flag.name, lastRollback: String(rollbackEntry?.timestamp ?? 'NEVER'), lastHealthy: String(healthyEntry?.timestamp ?? 'NEVER') };
    });
    return { rollouts, releases, rollback };
  }
}
