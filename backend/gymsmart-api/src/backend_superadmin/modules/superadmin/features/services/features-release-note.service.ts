// RESPONSIBILITY: Implements feature release-note CRUD and maps persistence into the frontend contract.
// FLOW: Controller -> FeaturesReleaseNoteService -> repository -> public response shape.
import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { FeatureReleaseNoteRepository } from '@/backend_superadmin/modules/superadmin/features/features-release-note.repository';
import type { FeaturesReleaseNoteCreateDto } from '@/backend_superadmin/modules/superadmin/features/dtos/features-release-note-create.dto';
import type { FeaturesReleaseNoteUpdateDto } from '@/backend_superadmin/modules/superadmin/features/dtos/features-release-note-update.dto';
@Injectable()
export class FeaturesReleaseNoteService {
  constructor(private readonly repository: FeatureReleaseNoteRepository) {}
  /** Lists active release notes. */
  async list(): Promise<Array<{ id: string; version: string; title: string; content: string; date: string; isPublished: boolean }>> { const rows = await this.repository.findAll(); return rows.map((item) => this.toPublic(item)); }
  /** Creates a release note. */
  async create(input: FeaturesReleaseNoteCreateDto): Promise<ReturnType<FeaturesReleaseNoteService['toPublic']>> { const row = await this.repository.create({ id: randomUUID(), version: input.version, title: input.title, content: input.content, date: input.date ?? new Date(), isPublished: input.isPublished ?? false }); return this.toPublic(row); }
  /** Updates a release note or throws if it no longer exists. */
  async update(id: string, input: FeaturesReleaseNoteUpdateDto): Promise<ReturnType<FeaturesReleaseNoteService['toPublic']>> { if (!(await this.repository.findById(id))) throw new NotFoundException('Release note not found'); const row = await this.repository.updateById(id, input); return this.toPublic(row); }
  /** Soft-deletes a release note. */
  async remove(id: string): Promise<null> { if (!(await this.repository.findById(id))) throw new NotFoundException('Release note not found'); await this.repository.softDeleteById(id); return null; }
  /** Maps one release note to the frontend-safe response shape. */
  private toPublic(row: { id: string; version: string; title: string; content: string; date: Date; isPublished: boolean }): { id: string; version: string; title: string; content: string; date: string; isPublished: boolean } { return { id: row.id, version: row.version, title: row.title, content: row.content, date: row.date.toISOString(), isPublished: row.isPublished }; }
}
