// RESPONSIBILITY: Returns live feature-flag and release-note state for the Superadmin frontend contract.
// FLOW: Controller -> SuperadminFeaturesMainService -> SuperadminFeaturesRepository + SuperadminFeaturesReleaseNoteRepository -> public contract.
import { Injectable } from '@nestjs/common';
import { SuperadminFeaturesRepository } from '@/backend_superadmin/superadmin_modules/features/superadmin-features.repository';
import { SuperadminFeaturesReleaseNoteRepository } from '@/backend_superadmin/superadmin_modules/features/superadmin-features-release-note.repository';
import { SuperadminFeaturesMapper } from '@/backend_superadmin/superadmin_modules/features/superadmin-features.mapper';
/**
 * Primary Intent: Defines SuperadminFeaturesMainService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminFeaturesMainService {
  constructor(private readonly repository: SuperadminFeaturesRepository, private readonly releaseNotes: SuperadminFeaturesReleaseNoteRepository) {}
/**
 * Primary Intent: Executes the findFeaturesData use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the findFeaturesData use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findFeaturesData(): Promise<{ flags: ReturnType<typeof SuperadminFeaturesMapper.toDomainList>; notes: Array<{ id: string; version: string; title: string; content: string; date: string; isPublished: boolean }> }> {
    const page = await this.repository.findPage({ page: 1, limit: 100, sortBy: 'updatedAt', sortOrder: 'DESC' });
    const notes = await this.releaseNotes.findAll();
    return { flags: SuperadminFeaturesMapper.toDomainList(page.items), notes: notes.map((item) => ({ id: item.id, version: item.version, title: item.title, content: item.content, date: item.date.toISOString(), isPublished: item.isPublished })) };
  }
}
