// RESPONSIBILITY: Owns named persistence operations for feature release notes.
// FLOW: release-note service -> repository -> FeatureReleaseNoteEntity -> PostgreSQL.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeatureReleaseNoteEntity } from '@/modules/superadmin/features/features-release-note.entity';
@Injectable()
export class FeatureReleaseNoteRepository {
  constructor(@InjectRepository(FeatureReleaseNoteEntity) private readonly repository: Repository<FeatureReleaseNoteEntity>) {}
  /** Returns all active release notes ordered newest-first. */
  async findAll(): Promise<FeatureReleaseNoteEntity[]> { return this.repository.find({ where: { deletedAt: null } as never, order: { date: 'DESC' } as never }); }
  /** Returns one active release note or null. */
  async findById(id: string): Promise<FeatureReleaseNoteEntity | null> { return this.repository.findOne({ where: { id, deletedAt: null } as never }); }
  /** Creates a release note. */
  async create(input: { id: string; version: string; title: string; content: string; date: Date; isPublished: boolean }): Promise<FeatureReleaseNoteEntity> { return this.repository.save(this.repository.create(input)); }
  /** Updates a release note through a named mutation. */
  async updateById(id: string, input: Partial<Pick<FeatureReleaseNoteEntity, 'version' | 'title' | 'content' | 'date' | 'isPublished'>>): Promise<FeatureReleaseNoteEntity> { await this.repository.update({ id, deletedAt: null } as never, input as never); const row = await this.findById(id); if (!row) throw new Error('Release note not found'); return row; }
  /** Soft-deletes a release note. */
  async softDeleteById(id: string): Promise<void> { await this.repository.update({ id, deletedAt: null } as never, { deletedAt: new Date() }); }
}
