// RESPONSIBILITY: Owns named persistence operations for feature release notes.
// FLOW: release-note service -> repository -> FeaturesReleaseNoteEntity -> PostgreSQL.
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeaturesReleaseNoteEntity } from '@/backend_superadmin/modules/superadmin/features/features-release-note.entity';
@Injectable()
export class FeaturesReleaseNoteRepository {
  constructor(@InjectRepository(FeaturesReleaseNoteEntity) private readonly repository: Repository<FeaturesReleaseNoteEntity>) {}
  /** Returns all active release notes ordered newest-first. */
  async findAll(): Promise<FeaturesReleaseNoteEntity[]> { return this.repository.find({ where: { deletedAt: null } as never, order: { date: 'DESC' } as never }); }
  /** Returns one active release note or null. */
  async findById(id: string): Promise<FeaturesReleaseNoteEntity | null> { return this.repository.findOne({ where: { id, deletedAt: null } as never }); }
  /** Returns one active release note or throws with the stable module error code. */
  async findByIdOrThrow(id: string): Promise<FeaturesReleaseNoteEntity> {
    const row = await this.findById(id);
    if (!row) throw new NotFoundException({ error: 'NOT_FOUND', errorCode: 'FEATURES.RELEASE_NOTE.NOT_FOUND', message: { key: 'features.ERRORS.NOT_FOUND' } });
    return row;
  }
  /** Creates a release note. */
  async create(input: { id: string; version: string; title: string; content: string; date: Date; isPublished: boolean }): Promise<FeaturesReleaseNoteEntity> { return this.repository.save(this.repository.create(input)); }
  /** Updates a release note through a named mutation. */
  async updateById(id: string, input: Partial<Pick<FeaturesReleaseNoteEntity, 'version' | 'title' | 'content' | 'date' | 'isPublished'>>): Promise<FeaturesReleaseNoteEntity> { await this.repository.update({ id, deletedAt: null } as never, input as never); return this.findByIdOrThrow(id); }
  /** Soft-deletes a release note. */
  async softDeleteById(id: string): Promise<void> { await this.repository.update({ id, deletedAt: null } as never, { deletedAt: new Date() }); }
}