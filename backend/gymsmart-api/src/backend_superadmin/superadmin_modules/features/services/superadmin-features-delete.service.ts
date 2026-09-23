// RESPONSIBILITY: Executes the soft-delete flow for the features feature.
// FLOW: CommandController -> SuperadminFeaturesDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { SuperadminFeaturesRepository } from '@/backend_superadmin/superadmin_modules/features/superadmin-features.repository';
@Injectable()
export class SuperadminFeaturesDeleteService {
  constructor(private readonly repository: SuperadminFeaturesRepository) {}
  /** Soft-deletes one features record. */
  async deleteFeatures(id: string): Promise<null> { await this.repository.deleteFeaturesById(id); return null; }
}