// RESPONSIBILITY: Executes the soft-delete flow for the analytics feature.
// FLOW: CommandController -> SuperadminAnalyticsDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { SuperadminAnalyticsRepository } from '@/backend_superadmin/superadmin_modules/analytics/superadmin-analytics.repository';
@Injectable()
export class SuperadminAnalyticsDeleteService {
  constructor(private readonly repository: SuperadminAnalyticsRepository) {}
  /** Soft-deletes one analytics record. */
  async deleteAnalytics(id: string): Promise<null> { await this.repository.deleteAnalyticsById(id); return null; }
}