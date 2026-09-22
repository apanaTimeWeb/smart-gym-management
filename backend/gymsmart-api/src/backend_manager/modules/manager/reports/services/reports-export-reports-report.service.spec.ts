// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for ReportsExportReportsReportService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> ReportsExportReportsReportService.exportReportsReport -> observable return/delegation.
import { ReportsExportReportsReportService } from '@/backend_manager/modules/manager/reports/services/reports-export-reports-report.service';

describe('ReportsExportReportsReportService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'reports' } as const;
    const dependency = { exportReportsReport: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new ReportsExportReportsReportService(dependency as never);
    const result = await service.exportReportsReport({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.exportReportsReport as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
