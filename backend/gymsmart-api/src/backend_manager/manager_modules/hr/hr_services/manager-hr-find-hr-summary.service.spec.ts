// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { HrFindHrSummaryService } from '@/backend_manager/manager_modules/hr/hr_services/manager-hr-find-hr-summary.service';

describe('HrFindHrSummaryService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findHrList: jest.fn().mockResolvedValue(expected) };
    const service = new HrFindHrSummaryService(dependency as never);
    const result = await service.findHrSummary({} as never);
    expect(result).toEqual(expected);
    expect(dependency.findHrList).toHaveBeenCalledTimes(1);
    expect(dependency.findHrList).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findHrList: jest.fn().mockRejectedValue(failure) };
    const service = new HrFindHrSummaryService(dependency as never);
    await expect(service.findHrSummary({} as never)).rejects.toBe(failure);
    expect(dependency.findHrList).toHaveBeenCalledTimes(1);
  });
});
