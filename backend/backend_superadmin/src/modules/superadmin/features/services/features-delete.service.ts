// RESPONSIBILITY: Executes the soft-delete flow for the features feature.
// FLOW: CommandController -> FeaturesDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { FeaturesRepository } from '@/modules/superadmin/features/features.repository';
@Injectable()
export class FeaturesDeleteService {
  constructor(private readonly repository: FeaturesRepository) {}
  /** Soft-deletes one features record. */
  async deleteFeatures(id: string): Promise<null> { await this.repository.deleteFeaturesById(id); return null; }
}
