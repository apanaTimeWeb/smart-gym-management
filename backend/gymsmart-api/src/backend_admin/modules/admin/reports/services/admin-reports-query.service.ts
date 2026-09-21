// RESPONSIBILITY: Owns read-side use cases for Admin reports; no write persistence occurs here.
// FLOW: AdminReportsQueryController â†’ AdminReportsQueryService â†’ repository â†’ mapper â†’ ApiResponse.

import { Injectable } from '@nestjs/common';
import { AdminReportsRepository } from '@/backend_admin/modules/admin/reports/repositories/admin-reports-repository';
import { AdminReportsMapper } from '@/backend_admin/modules/admin/reports/mappers/admin-reports.mapper';
import { AdminReportsQueryDto } from '@/backend_admin/modules/admin/reports/dtos/admin-reports-query.dto';
import { AdminReportsDataResponseDto } from '@/backend_admin/modules/admin/reports/dtos/admin-reports-response.dto';

@Injectable()
export class AdminReportsQueryService {
  constructor(
    private readonly repository: AdminReportsRepository,
    private readonly mapper: AdminReportsMapper,
  ) {}


  /** @description Executes fetchReportData for the Admin reports feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchReportData(_query?: AdminReportsQueryDto): Promise<AdminReportsDataResponseDto> {
    const snapshot = await this.repository.findFirstSnapshot(); 
    return (snapshot ? this.mapper.toResponse(this.mapper.toDomain(snapshot)) : {}) as unknown as AdminReportsDataResponseDto;
  }
}
