// RESPONSIBILITY: Returns live feature-flag and release-note state for the Superadmin frontend contract.
// FLOW: Controller -> FeaturesMainService -> FeaturesRepository + FeatureReleaseNoteRepository -> public contract.
import { Injectable } from '@nestjs/common';
import { FeaturesRepository } from '@/backend_superadmin/modules/superadmin/features/features.repository';
import { FeatureReleaseNoteRepository } from '@/backend_superadmin/modules/superadmin/features/features-release-note.repository';
import { FeaturesMapper } from '@/backend_superadmin/modules/superadmin/features/features.mapper';
@Injectable()
export class FeaturesMainService {
  constructor(private readonly repository: FeaturesRepository, private readonly releaseNotes: FeatureReleaseNoteRepository) {}
  /** Returns the complete live feature flags + release notes contract. */
  async findFeaturesData(): Promise<{ flags: ReturnType<typeof FeaturesMapper.toDomainList>; notes: Array<{ id: string; version: string; title: string; content: string; date: string; isPublished: boolean }> }> {
    const page = await this.repository.findPage({ page: 1, limit: 100, sortBy: 'updatedAt', sortOrder: 'DESC' });
    const notes = await this.releaseNotes.findAll();
    return { flags: FeaturesMapper.toDomainList(page.items), notes: notes.map((item) => ({ id: item.id, version: item.version, title: item.title, content: item.content, date: item.date.toISOString(), isPublished: item.isPublished })) };
  }
}
