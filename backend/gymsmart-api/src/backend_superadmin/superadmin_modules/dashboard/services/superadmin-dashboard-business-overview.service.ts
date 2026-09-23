// RESPONSIBILITY: Reads the frontend contract state owned by this feature from PostgreSQL; no mock data is returned by the service.
// FLOW: Controller -> SuperadminDashboardBusinessOverviewService -> SuperadminDashboardRepository -> live invoice aggregate -> canonical response interceptor.
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SuperadminDashboardBusinessOverviewResponseDto } from '@/backend_superadmin/superadmin_modules/dashboard/superadmin-dashboard-business-overview-response.dto';
import { SuperadminDashboardRepository } from '@/backend_superadmin/superadmin_modules/dashboard/superadmin-dashboard.repository';

@Injectable()
export class SuperadminDashboardBusinessOverviewService {
  constructor(private readonly repository: SuperadminDashboardRepository, private readonly config: ConfigService) {}

  /** Returns the latest persisted frontend contract payload for this use case. */
  async findDashboardBusinessOverview(input: Record<string, unknown> = {}): Promise<SuperadminDashboardBusinessOverviewResponseDto> {
    return await this.repository.getLiveBusinessOverview(this.config.get<string>('app.defaultCurrency') ?? 'INR', input) as unknown as SuperadminDashboardBusinessOverviewResponseDto;
  }
}