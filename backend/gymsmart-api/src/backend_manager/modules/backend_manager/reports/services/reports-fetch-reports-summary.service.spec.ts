// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { ReportsFetchReportsSummaryService } from '@/backend_manager/modules/backend_manager/reports/services/reports-fetch-reports-summary.service';

describe('ReportsFetchReportsSummaryService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findReportsList: jest.fn().mockResolvedValue(expected) };
    const service = new ReportsFetchReportsSummaryService(dependency as never);
    const result = await service.fetchReportsSummary({} as never);
    expect(result).toEqual(expected);
    expect(dependency.findReportsList).toHaveBeenCalledTimes(1);
    expect(dependency.findReportsList).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findReportsList: jest.fn().mockRejectedValue(failure) };
    const service = new ReportsFetchReportsSummaryService(dependency as never);
    await expect(service.fetchReportsSummary({} as never)).rejects.toBe(failure);
    expect(dependency.findReportsList).toHaveBeenCalledTimes(1);
  });
});
