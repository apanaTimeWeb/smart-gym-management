// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { ReportsRepository } from '@/backend_manager/manager_modules/reports/manager-reports.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

@Injectable()
export class ManagerReportsExportReportsReportService {
  constructor(private readonly repository: ReportsRepository) {}

  /** @description Builds a CSV export from real tenant report rows. @param query - Validated report filters. @returns CSV bytes for download. */
  async createReportsExport(query: ManagerCoreJsonObject = {}): Promise<Buffer> {
    const result = await this.repository.findAll(query);
    const rows = result.data.map((row: any) => ({ id: row.id, ...row.payload }));
    return this.toCsv(rows);
  }

  /** @description Serializes report rows. @param rows - Report records. @returns CSV bytes. */
  private toCsv(rows: Array<Record<string, unknown>>): Buffer {
    const keys = [...new Set(rows.flatMap((row) => Object.keys(row)))].sort();
    const lines = [keys.join(',')];
    for (const row of rows) {
      lines.push(keys.map((key) => { const value = row[key] == null ? '' : typeof row[key] === 'object' ? JSON.stringify(row[key]) : String(row[key]); return /[",\n]/.test(value) ? `"${value.replaceAll('"', '""')}"` : value; }).join(','));
    }
    return Buffer.from(lines.join('\n'),'utf8');
  }
}

export { ManagerReportsExportReportsReportService as ReportsExportReportsReportService };
