// RESPONSIBILITY: Owns read-side use cases for Admin payouts; no write persistence occurs here.
// FLOW: AdminPayoutsQueryController â†’ AdminPayoutsQueryService â†’ repository â†’ mapper â†’ ApiResponse.
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

import { AdminPayoutsQueryDto } from '@/backend_admin/admin_modules/admin_payouts/payouts_dtos/admin-payouts-query.dto'
import { AdminGymPayoutDto, AdminPnLEntryDto, AdminPayoutsKPIDataDto } from '@/backend_admin/admin_modules/admin_payouts/payouts_dtos/admin-payouts-response.dto'
import { AdminPayoutsResponsePresenter } from '@/backend_admin/admin_modules/admin_payouts/payouts_mappers/admin-payouts.response.presenter'
import { AdminPayoutsRepository } from '@/backend_admin/admin_modules/admin_payouts/payouts_repositories/admin-payouts-repository'

@Injectable()
/**
 * @description Defines the AdminPayoutsQueryService boundary for the admin_payouts backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminPayoutsQueryService {
  constructor(
    private readonly repository: AdminPayoutsRepository,
    private readonly presenter: AdminPayoutsResponsePresenter,
  ) {}

  /** @description Executes fetchPayouts for the Admin payouts feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findAllPayouts(query: AdminPayoutsQueryDto): Promise<AdminGymPayoutDto[]> {
    const snapshot = await this.repository.findLatestReadModel(query); 
    if (!snapshot) throw new NotFoundException('PAYOUTS.READ_MODEL.NOT_FOUND');
    return this.presenter.toPayoutsResponse(snapshot);
  }

  /** @description Executes fetchPnl for the Admin payouts feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findPayoutsPnl(query: AdminPayoutsQueryDto): Promise<AdminPnLEntryDto[]> {
    const snapshot = await this.repository.findLatestReadModel(query); 
    if (!snapshot) throw new NotFoundException('PAYOUTS.READ_MODEL.NOT_FOUND');
    return this.presenter.toPnlResponse(snapshot);
  }

  /** @description Executes fetchKPIs for the Admin payouts feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findPayoutKpis(query: AdminPayoutsQueryDto): Promise<AdminPayoutsKPIDataDto> {
    const snapshot = await this.repository.findLatestReadModel(query); 
    if (!snapshot) throw new NotFoundException('ADMIN.READ.NOT_FOUND');
    return this.presenter.toKpiResponse(snapshot);
  }
}
