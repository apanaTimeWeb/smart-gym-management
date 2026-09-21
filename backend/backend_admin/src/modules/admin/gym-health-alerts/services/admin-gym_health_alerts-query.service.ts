// RESPONSIBILITY: Owns read-side use cases for Admin gym-health-alerts; no write persistence occurs here.
// FLOW: AdminGymHealthAlertsQueryController → AdminGymHealthAlertsQueryService → repository → mapper → ApiResponse.

import { Injectable } from '@nestjs/common';
import { AdminGymHealthAlertsRepository } from '@/modules/admin/gym-health-alerts/repositories/admin-gym_health_alerts-repository';
import { AdminGymHealthAlertsMapper } from '@/modules/admin/gym-health-alerts/mappers/admin-gym_health_alerts.mapper';
import { AdminGymHealthAlertsQueryDto } from '@/modules/admin/gym-health-alerts/dtos/admin-gym_health_alerts-query.dto';

@Injectable()
export class AdminGymHealthAlertsQueryService {
  constructor(
    private readonly repository: AdminGymHealthAlertsRepository,
    private readonly mapper: AdminGymHealthAlertsMapper,
  ) {}


  /** @description Executes fetchAlerts for the Admin gym-health-alerts feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchAlerts(query: AdminGymHealthAlertsQueryDto): Promise<Record<string, unknown>[]> {
    const result = await this.repository.findAll(query); return result.items.map((entity) => this.mapper.toResponse(this.mapper.toDomain(entity)));
  }

  /** @description Executes fetchKPIs for the Admin gym-health-alerts feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchKPIs(query: AdminGymHealthAlertsQueryDto): Promise<Record<string, unknown>> {
    const snapshot = await this.repository.findFirstSnapshot(); return snapshot ? (snapshot.payload as Record<string, unknown>) : {};
  }
}
