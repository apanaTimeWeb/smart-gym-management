// RESPONSIBILITY: Owns read-side use cases for Admin gym-health-alerts; no write persistence occurs here.
// FLOW: AdminGymHealthAlertsQueryController â†’ AdminGymHealthAlertsQueryService â†’ repository â†’ mapper â†’ ApiResponse.
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

import { AdminGymHealthAlertsQueryDto } from '@/backend_admin/admin_modules/admin_gym-health-alerts/gym-health-alerts_dtos/admin-gym-health-alerts-query.dto'
import { AdminGymHealthAlertDto, AdminGymHealthKPIDataDto } from '@/backend_admin/admin_modules/admin_gym-health-alerts/gym-health-alerts_dtos/admin-gym-health-alerts-response.dto'
import { AdminGymHealthAlertsResponsePresenter } from '@/backend_admin/admin_modules/admin_gym-health-alerts/gym-health-alerts_mappers/admin-gym-health-alerts.response.presenter'
import { AdminGymHealthAlertsRepository } from '@/backend_admin/admin_modules/admin_gym-health-alerts/gym-health-alerts_repositories/admin-gym-health-alerts-repository'

import type { AdminCorePaginatedResult } from '@/backend_admin/admin_core/admin_core_types/admin-core-api-response.types'

@Injectable()
/**
 * @description Defines the AdminGymHealthAlertsQueryService boundary for the admin_gym-health-alerts backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminGymHealthAlertsQueryService {
  constructor(
    private readonly repository: AdminGymHealthAlertsRepository,
    private readonly presenter: AdminGymHealthAlertsResponsePresenter,
  ) {}

  /** @description Executes fetchAlerts for the Admin gym-health-alerts feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findAllAlerts(query: AdminGymHealthAlertsQueryDto): Promise<AdminCorePaginatedResult<AdminGymHealthAlertDto>> {
    const result = await this.repository.findAll(query);
    return { items: (result.items.map((entity) => this.presenter.toResponse(entity))) as any, meta: result.meta };
  }

  /** @description Executes fetchKPIs for the Admin gym-health-alerts feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findAlertKpis(query: AdminGymHealthAlertsQueryDto): Promise<AdminGymHealthKPIDataDto> {
    const snapshot = await this.repository.findLatestReadModel(query); 
    if (!snapshot) throw new NotFoundException('ADMIN.READ.NOT_FOUND');
    return this.presenter.toKpiResponse(snapshot);
  }
}
