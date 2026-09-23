// RESPONSIBILITY: Executes the soft-delete flow for the analytics feature.
// FLOW: CommandController -> AnalyticsDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { AnalyticsRepository } from '@/backend_superadmin/modules/superadmin/analytics/analytics.repository';
@Injectable()
export class AnalyticsDeleteService {
  constructor(private readonly repository: AnalyticsRepository) {}
  /** Soft-deletes one analytics record. */
  async deleteAnalytics(id: string): Promise<null> { await this.repository.deleteAnalyticsById(id); return null; }
}