// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { HrFetchHrSummaryService } from '@/backend_manager/modules/backend_manager/hr/services/hr-fetch-hr-summary.service';

describe('HrFetchHrSummaryService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findHrList: jest.fn().mockResolvedValue(expected) };
    const service = new HrFetchHrSummaryService(dependency as never);
    const result = await service.fetchHrSummary({} as never);
    expect(result).toEqual(expected);
    expect(dependency.findHrList).toHaveBeenCalledTimes(1);
    expect(dependency.findHrList).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findHrList: jest.fn().mockRejectedValue(failure) };
    const service = new HrFetchHrSummaryService(dependency as never);
    await expect(service.fetchHrSummary({} as never)).rejects.toBe(failure);
    expect(dependency.findHrList).toHaveBeenCalledTimes(1);
  });
});
