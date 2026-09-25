// RESPONSIBILITY: Owns named persistence operations for feature release notes.
// FLOW: release-note service -> repository -> SuperadminFeaturesReleaseNoteEntity -> PostgreSQL.
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuperadminFeaturesReleaseNoteEntity } from '@/backend_superadmin/superadmin_modules/features/superadmin-features-release-note.entity';
/**
 * Primary Intent: Defines SuperadminFeaturesReleaseNoteRepository as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminFeaturesReleaseNoteRepository {
  constructor(@InjectRepository(SuperadminFeaturesReleaseNoteEntity) private readonly repository: Repository<SuperadminFeaturesReleaseNoteEntity>) {}
  /**
 * Primary Intent: Executes the findAll use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findAll(): Promise<SuperadminFeaturesReleaseNoteEntity[]> { return this.repository.find({ where: { deletedAt: null } as never, order: { date: 'DESC' } as never }); }
  /**
 * Primary Intent: Executes the findById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findById(id: string): Promise<SuperadminFeaturesReleaseNoteEntity | null> { return this.repository.findOne({ where: { id, deletedAt: null } as never }); }
  /**
 * Primary Intent: Executes the findByIdOrThrow use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findByIdOrThrow(id: string): Promise<SuperadminFeaturesReleaseNoteEntity> {
    const row = await this.findById(id);
    if (!row) throw new NotFoundException({ error: 'NOT_FOUND', errorCode: 'FEATURES.RELEASE_NOTE.NOT_FOUND', message: { key: 'features.ERRORS.NOT_FOUND' } });
    return row;
  }
  /** Creates a release note. */
  async create(input: { id: string; version: string; title: string; content: string; date: Date; isPublished: boolean }): Promise<SuperadminFeaturesReleaseNoteEntity> { return this.repository.save(this.repository.create(input)); }
  /**
 * Primary Intent: Executes the updateById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async updateById(id: string, input: Partial<Pick<SuperadminFeaturesReleaseNoteEntity, 'version' | 'title' | 'content' | 'date' | 'isPublished'>>): Promise<SuperadminFeaturesReleaseNoteEntity> { await this.repository.update({ id, deletedAt: null } as never, input as never); return this.findByIdOrThrow(id); }
  /**
 * Primary Intent: Executes the softDeleteById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async softDeleteById(id: string): Promise<void> { await this.repository.update({ id, deletedAt: null } as never, { deletedAt: new Date() }); }
}
