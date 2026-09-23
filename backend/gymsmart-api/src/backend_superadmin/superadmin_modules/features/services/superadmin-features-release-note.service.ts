// RESPONSIBILITY: Implements feature release-note CRUD and maps persistence into the frontend contract.
// FLOW: Controller -> SuperadminFeaturesReleaseNoteService -> repository -> public response shape.
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { SuperadminFeaturesReleaseNoteRepository } from '@/backend_superadmin/superadmin_modules/features/superadmin-features-release-note.repository';
import { SuperadminFeaturesReleaseNoteCreateDto } from '@/backend_superadmin/superadmin_modules/features/dtos/superadmin-features-release-note-create.dto';
import { SuperadminFeaturesReleaseNoteUpdateDto } from '@/backend_superadmin/superadmin_modules/features/dtos/superadmin-features-release-note-update.dto';
@Injectable()
export class SuperadminFeaturesReleaseNoteService {
  constructor(private readonly repository: SuperadminFeaturesReleaseNoteRepository) {}
  /** Lists active release notes. */
  async list(): Promise<Array<{ id: string; version: string; title: string; content: string; date: string; isPublished: boolean }>> { const rows = await this.repository.findAll(); return rows.map((item) => this.toPublic(item)); }
  /** Creates a release note. */
  async create(input: SuperadminFeaturesReleaseNoteCreateDto): Promise<ReturnType<SuperadminFeaturesReleaseNoteService['toPublic']>> { const row = await this.repository.create({ id: randomUUID(), version: input.version, title: input.title, content: input.content, date: input.date ?? new Date(), isPublished: input.isPublished ?? false }); return this.toPublic(row); }
  /** Updates a release note or throws if it no longer exists. */
  async update(id: string, input: SuperadminFeaturesReleaseNoteUpdateDto): Promise<ReturnType<SuperadminFeaturesReleaseNoteService['toPublic']>> { await this.repository.findByIdOrThrow(id); const row = await this.repository.updateById(id, input); return this.toPublic(row); }
  /** Soft-deletes a release note. */
  async remove(id: string): Promise<null> { await this.repository.findByIdOrThrow(id); await this.repository.softDeleteById(id); return null; }
  /** Maps one release note to the frontend-safe response shape. */
  private toPublic(row: { id: string; version: string; title: string; content: string; date: Date; isPublished: boolean }): { id: string; version: string; title: string; content: string; date: string; isPublished: boolean } { return { id: row.id, version: row.version, title: row.title, content: row.content, date: row.date.toISOString(), isPublished: row.isPublished }; }
}