// RESPONSIBILITY: Implements feature release-note CRUD and maps persistence into the frontend contract.
// FLOW: Controller -> SuperadminFeaturesReleaseNoteService -> repository -> public response shape.
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { SuperadminFeaturesReleaseNoteRepository } from '@/backend_superadmin/superadmin_modules/features/superadmin-features-release-note.repository';
import { SuperadminFeaturesReleaseNoteCreateDto } from '@/backend_superadmin/superadmin_modules/features/features_dtos/superadmin-features-release-note-create.dto';
import { SuperadminFeaturesReleaseNoteUpdateDto } from '@/backend_superadmin/superadmin_modules/features/features_dtos/superadmin-features-release-note-update.dto';
/**
 * Primary Intent: Defines SuperadminFeaturesReleaseNoteService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminFeaturesReleaseNoteService {
  constructor(private readonly repository: SuperadminFeaturesReleaseNoteRepository) {}
/**
 * Primary Intent: Executes the list use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the list use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async list(): Promise<Array<{ id: string; version: string; title: string; content: string; date: string; isPublished: boolean }>> { const rows = await this.repository.findAll(); return rows.map((item) => this.toPublic(item)); }
/**
 * Primary Intent: Executes the create use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the create use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async create(input: SuperadminFeaturesReleaseNoteCreateDto): Promise<ReturnType<SuperadminFeaturesReleaseNoteService['toPublic']>> { const row = await this.repository.create({ id: randomUUID(), version: input.version, title: input.title, content: input.content, date: input.date ?? new Date(), isPublished: input.isPublished ?? false }); return this.toPublic(row); }
/**
 * Primary Intent: Executes the update use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the update use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async update(id: string, input: SuperadminFeaturesReleaseNoteUpdateDto): Promise<ReturnType<SuperadminFeaturesReleaseNoteService['toPublic']>> { await this.repository.findByIdOrThrow(id); const row = await this.repository.updateById(id, input); return this.toPublic(row); }
  /**
 * Primary Intent: Executes the `remove` responsibility owned by this feature-local superadmin-features-release-note.service construct.
   * Edge Cases: Missing records, invalid inputs, and downstream failures must fail fast and preserve the owning feature's error contract.
   * Side-Effects: Only the documented persistence, cache, queue, event, or adapter effects of this method are allowed.
   * AI-Note: Preserve the explicit return type, single responsibility, dependency boundary, and repository/service separation when repairing this method.
   */
  /**
   * Primary Intent: Executes the remove use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async remove(id: string): Promise<null> { await this.repository.findByIdOrThrow(id); await this.repository.softDeleteById(id); return null; }
  /**
 * Primary Intent: Executes the `toPublic` responsibility owned by this superadmin-features-release-note.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  private toPublic(row: { id: string; version: string; title: string; content: string; date: Date; isPublished: boolean }): { id: string; version: string; title: string; content: string; date: string; isPublished: boolean } { return { id: row.id, version: row.version, title: row.title, content: row.content, date: row.date.toISOString(), isPublished: row.isPublished }; }
}
