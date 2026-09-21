// RESPONSIBILITY: Owns read-side use cases for Admin payouts; no write persistence occurs here.
// FLOW: AdminPayoutsQueryController â†’ AdminPayoutsQueryService â†’ repository â†’ mapper â†’ ApiResponse.

import { Injectable } from '@nestjs/common';
import { AdminPayoutsRepository } from '@/backend_admin/modules/admin/payouts/repositories/admin-payouts-repository';
import { AdminPayoutsMapper } from '@/backend_admin/modules/admin/payouts/mappers/admin-payouts.mapper';
import { AdminPayoutsQueryDto } from '@/backend_admin/modules/admin/payouts/dtos/admin-payouts-query.dto';
import { AdminGymPayoutDto, AdminPnLEntryDto, AdminPayoutsKPIDataDto } from '@/backend_admin/modules/admin/payouts/dtos/admin-payouts-response.dto';

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
    return (snapshot ? snapshot.payload['payouts'] ?? [] : []) as unknown as AdminGymPayoutDto[];
  }

  /** @description Executes fetchPnl for the Admin payouts feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchPnl(query: AdminPayoutsQueryDto): Promise<AdminPnLEntryDto[]> {
    const snapshot = await this.repository.findFirstSnapshot(); 
    return (snapshot ? snapshot.payload['pnl'] ?? [] : []) as unknown as AdminPnLEntryDto[];
  }

  /** @description Executes fetchKPIs for the Admin payouts feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchKPIs(query: AdminPayoutsQueryDto): Promise<AdminPayoutsKPIDataDto> {
    const snapshot = await this.repository.findFirstSnapshot(); 
    return (snapshot ? snapshot.payload : {}) as unknown as AdminPayoutsKPIDataDto;
  }
}
