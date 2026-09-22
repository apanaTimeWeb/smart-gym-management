// RESPONSIBILITY: Co-located behavioral unit proof for ReportsFetchReportsSummaryService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> ReportsFetchReportsSummaryService.fetchReportsSummary -> observable return/delegation.
import { ReportsFetchReportsSummaryService } from '@/modules/manager/reports/services/reports-fetch-reports-summary.service.ts';

describe('ReportsFetchReportsSummaryService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'reports' } as const;
    const dependency = { fetchReportsSummary: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new ReportsFetchReportsSummaryService(dependency as never);
    const result = await service.fetchReportsSummary({} as never);
    expect(result).toEqual(expected);
    expect((dependency.fetchReportsSummary as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
