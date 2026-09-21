// RESPONSIBILITY: Owns read-side use cases for Admin data-export; no write persistence occurs here.
// FLOW: AdminDataExportQueryController → AdminDataExportQueryService → repository → mapper → ApiResponse.

import { Injectable } from '@nestjs/common';
import { AdminDataExportRepository } from '@/modules/admin/data-export/repositories/admin-data_export-repository';
import { AdminDataExportMapper } from '@/modules/admin/data-export/mappers/admin-data_export.mapper';
import { AdminDataExportQueryDto } from '@/modules/admin/data-export/dtos/admin-data_export-query.dto';

@Injectable()
export class AdminDataExportQueryService {
  constructor(
    private readonly repository: AdminDataExportRepository,
    private readonly mapper: AdminDataExportMapper,
  ) {}


  /** @description Executes fetchJobs for the Admin data-export feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchJobs(query: AdminDataExportQueryDto): Promise<Record<string, unknown>[]> {
    const result = await this.repository.findAll(query); return result.items.map((entity) => this.mapper.toResponse(this.mapper.toDomain(entity)));
  }

  /** @description Executes fetchKPIs for the Admin data-export feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchKPIs(query: AdminDataExportQueryDto): Promise<Record<string, unknown>> {
    const snapshot = await this.repository.findFirstSnapshot(); return snapshot ? (snapshot.payload as Record<string, unknown>) : {};
  }
}
