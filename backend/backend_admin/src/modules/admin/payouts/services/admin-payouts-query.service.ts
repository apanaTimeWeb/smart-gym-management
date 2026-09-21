// RESPONSIBILITY: Owns read-side use cases for Admin payouts; no write persistence occurs here.
// FLOW: AdminPayoutsQueryController → AdminPayoutsQueryService → repository → mapper → ApiResponse.

import { Injectable } from '@nestjs/common';
import { AdminPayoutsRepository } from '@/modules/admin/payouts/repositories/admin-payouts-repository';
import { AdminPayoutsMapper } from '@/modules/admin/payouts/mappers/admin-payouts.mapper';
import { AdminPayoutsQueryDto } from '@/modules/admin/payouts/dtos/admin-payouts-query.dto';
import { AdminGymPayoutDto, AdminPnLEntryDto, AdminPayoutsKPIDataDto } from '@/modules/admin/payouts/dtos/admin-payouts-response.dto';

@Injectable()
export class AdminPayoutsQueryService {
  constructor(
    private readonly repository: AdminPayoutsRepository,
    private readonly mapper: AdminPayoutsMapper,
  ) {}


  /** @description Executes fetchPayouts for the Admin payouts feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchPayouts(query: AdminPayoutsQueryDto): Promise<AdminGymPayoutDto[]> {
    const snapshot = await this.repository.findFirstSnapshot(); 
    return (snapshot ? snapshot.payload['payouts'] ?? [] : []) as AdminGymPayoutDto[];
  }

  /** @description Executes fetchPnl for the Admin payouts feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchPnl(query: AdminPayoutsQueryDto): Promise<AdminPnLEntryDto[]> {
    const snapshot = await this.repository.findFirstSnapshot(); 
    return (snapshot ? snapshot.payload['pnl'] ?? [] : []) as AdminPnLEntryDto[];
  }

  /** @description Executes fetchKPIs for the Admin payouts feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchKPIs(query: AdminPayoutsQueryDto): Promise<AdminPayoutsKPIDataDto> {
    const snapshot = await this.repository.findFirstSnapshot(); 
    return (snapshot ? snapshot.payload : {}) as AdminPayoutsKPIDataDto;
  }
}
