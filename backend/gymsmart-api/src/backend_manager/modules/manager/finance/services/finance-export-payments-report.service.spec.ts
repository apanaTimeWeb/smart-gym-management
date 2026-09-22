// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for FinanceExportPaymentsReportService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> FinanceExportPaymentsReportService.exportPaymentsReport -> observable return/delegation.
import { FinanceExportPaymentsReportService } from '@/backend_manager/modules/manager/finance/services/finance-export-payments-report.service';

describe('FinanceExportPaymentsReportService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'finance' } as const;
    const dependency = { exportPaymentsReport: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new FinanceExportPaymentsReportService(dependency as never);
    const result = await service.exportPaymentsReport({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.exportPaymentsReport as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
