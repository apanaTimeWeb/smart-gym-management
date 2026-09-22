// @ts-nocheck
// RESPONSIBILITY: Read use-case for GET /api/v1/manager/finance/export?format=csv|pdf.
// FLOW: Controller -> FinanceExportPaymentsReportService -> repository query -> ORM-free domain -> response DTO.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { FinanceRepository } from '@/backend_manager/modules/manager/finance/repositories/finance-repository';

@Injectable()
export class FinanceExportPaymentsReportService {
  constructor(private readonly repository: FinanceRepository) {}

  /** @description Loads the finance collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async exportPaymentsReport(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findFinanceList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: rows[0]?.payload ?? {}, meta: result.meta };
  }
}
