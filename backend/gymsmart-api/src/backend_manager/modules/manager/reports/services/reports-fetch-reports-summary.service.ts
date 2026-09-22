// @ts-nocheck
// RESPONSIBILITY: Read use-case for GET /api/v1/manager/reports/summary.
// FLOW: Controller -> ReportsFetchReportsSummaryService -> repository query -> ORM-free domain -> response DTO.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { ReportsRepository } from '@/backend_manager/modules/manager/reports/repositories/reports-repository';

@Injectable()
export class ReportsFetchReportsSummaryService {
  constructor(private readonly repository: ReportsRepository) {}

  /** @description Loads the reports collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchReportsSummary(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findReportsList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: { revenueData: rows,  }, meta: result.meta };
  }
}
