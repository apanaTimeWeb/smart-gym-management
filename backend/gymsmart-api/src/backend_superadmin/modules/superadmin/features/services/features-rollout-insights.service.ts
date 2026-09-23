// RESPONSIBILITY: Projects persisted feature flags and release notes into live rollout insights.
// FLOW: Rollout insights query -> FeaturesRolloutInsightsService -> FeaturesRepository + FeaturesReleaseNoteRepository.
import { Injectable } from '@nestjs/common';
import { FeaturesRolloutInsightsResponseDto } from '@/backend_superadmin/modules/backend_superadmin/features/features-rollout-insights-response.dto';
import { FeaturesRepository } from '@/backend_superadmin/modules/backend_superadmin/features/features.repository';
import { FeaturesReleaseNoteRepository } from '@/backend_superadmin/modules/backend_superadmin/features/features-release-note.repository';

@Injectable()
export class FeaturesRolloutInsightsService {
  constructor(private readonly repository: FeaturesRepository, private readonly releaseNotes: FeaturesReleaseNoteRepository) {}

  /** Returns live rollout percentages, release notes, and rollback history derived from persisted feature state. */
  async findFeaturesRolloutInsights(): Promise<FeaturesRolloutInsightsResponseDto> {
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
