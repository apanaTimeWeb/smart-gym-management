// RESPONSIBILITY: Owns named persistence operations for feature release notes.
// FLOW: release-note service -> repository -> SuperadminFeaturesReleaseNoteEntity -> PostgreSQL.
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuperadminFeaturesReleaseNoteEntity } from '@/backend_superadmin/superadmin_modules/features/superadmin-features-release-note.entity';
@Injectable()
export class SuperadminFeaturesReleaseNoteRepository {
  constructor(@InjectRepository(SuperadminFeaturesReleaseNoteEntity) private readonly repository: Repository<SuperadminFeaturesReleaseNoteEntity>) {}
  /** Returns all active release notes ordered newest-first. */
  async findAll(): Promise<SuperadminFeaturesReleaseNoteEntity[]> { return this.repository.find({ where: { deletedAt: null } as never, order: { date: 'DESC' } as never }); }
  /** Returns one active release note or null. */
  async findById(id: string): Promise<SuperadminFeaturesReleaseNoteEntity | null> { return this.repository.findOne({ where: { id, deletedAt: null } as never }); }
  /** Returns one active release note or throws with the stable module error code. */
  async findByIdOrThrow(id: string): Promise<SuperadminFeaturesReleaseNoteEntity> {
    const row = await this.findById(id);
    if (!row) throw new NotFoundException({ error: 'NOT_FOUND', errorCode: 'FEATURES.RELEASE_NOTE.NOT_FOUND', message: { key: 'features.ERRORS.NOT_FOUND' } });
    return row;
  }
  /** Creates a release note. */
  async create(input: { id: string; version: string; title: string; content: string; date: Date; isPublished: boolean }): Promise<SuperadminFeaturesReleaseNoteEntity> { return this.repository.save(this.repository.create(input)); }
  /** Updates a release note through a named mutation. */
  async updateById(id: string, input: Partial<Pick<SuperadminFeaturesReleaseNoteEntity, 'version' | 'title' | 'content' | 'date' | 'isPublished'>>): Promise<SuperadminFeaturesReleaseNoteEntity> { await this.repository.update({ id, deletedAt: null } as never, input as never); return this.findByIdOrThrow(id); }
  /** Soft-deletes a release note. */
  async softDeleteById(id: string): Promise<void> { await this.repository.update({ id, deletedAt: null } as never, { deletedAt: new Date() }); }
}