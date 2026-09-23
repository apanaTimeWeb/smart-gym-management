// RESPONSIBILITY: Returns live feature-flag and release-note state for the Superadmin frontend contract.
// FLOW: Controller -> SuperadminFeaturesMainService -> SuperadminFeaturesRepository + SuperadminFeaturesReleaseNoteRepository -> public contract.
import { Injectable } from '@nestjs/common';
import { SuperadminFeaturesRepository } from '@/backend_superadmin/superadmin_modules/features/superadmin-features.repository';
import { SuperadminFeaturesReleaseNoteRepository } from '@/backend_superadmin/superadmin_modules/features/superadmin-features-release-note.repository';
import { SuperadminFeaturesMapper } from '@/backend_superadmin/superadmin_modules/features/superadmin-features.mapper';
@Injectable()
export class SuperadminFeaturesMainService {
  constructor(private readonly repository: SuperadminFeaturesRepository, private readonly releaseNotes: SuperadminFeaturesReleaseNoteRepository) {}
  /** Returns the complete live feature flags + release notes contract. */
  async findFeaturesData(): Promise<{ flags: ReturnType<typeof SuperadminFeaturesMapper.toDomainList>; notes: Array<{ id: string; version: string; title: string; content: string; date: string; isPublished: boolean }> }> {
    const page = await this.repository.findPage({ page: 1, limit: 100, sortBy: 'updatedAt', sortOrder: 'DESC' });
    const notes = await this.releaseNotes.findAll();
    return { flags: SuperadminFeaturesMapper.toDomainList(page.items), notes: notes.map((item) => ({ id: item.id, version: item.version, title: item.title, content: item.content, date: item.date.toISOString(), isPublished: item.isPublished })) };
  }
}