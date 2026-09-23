// RESPONSIBILITY: Reads the frontend contract state owned by this feature from PostgreSQL; no mock data is returned by the service.
// FLOW: Controller -> DashboardBusinessOverviewService -> DashboardRepository -> live invoice aggregate -> canonical response interceptor.
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DashboardBusinessOverviewResponseDto } from '@/backend_superadmin/modules/superadmin/dashboard/dashboard-business-overview-response.dto';
import { DashboardRepository } from '@/backend_superadmin/modules/superadmin/dashboard/dashboard.repository';

@Injectable()
export class DashboardBusinessOverviewService {
  constructor(private readonly repository: DashboardRepository, private readonly config: ConfigService) {}

  /** Returns the latest persisted frontend contract payload for this use case. */
  async findDashboardBusinessOverview(input: Record<string, unknown> = {}): Promise<DashboardBusinessOverviewResponseDto> {
    return await this.repository.getLiveBusinessOverview(this.config.get<string>('app.defaultCurrency') ?? 'INR', input) as unknown as DashboardBusinessOverviewResponseDto;
  }
}