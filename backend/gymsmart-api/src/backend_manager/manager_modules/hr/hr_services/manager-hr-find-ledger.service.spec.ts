// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { HrFindLedgerService } from '@/backend_manager/manager_modules/hr/hr_services/manager-hr-find-ledger.service';

describe('HrFindLedgerService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findHrList: jest.fn().mockResolvedValue(expected) };
    const service = new HrFindLedgerService(dependency as never);
    const result = await service.findLedger('test-id' as never, {} as never);
    expect(result).toEqual(expected);
    expect(dependency.findHrList).toHaveBeenCalledTimes(1);
    expect(dependency.findHrList).toHaveBeenCalledWith(expect.anything(), expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findHrList: jest.fn().mockRejectedValue(failure) };
    const service = new HrFindLedgerService(dependency as never);
    await expect(service.findLedger('test-id' as never, {} as never)).rejects.toBe(failure);
    expect(dependency.findHrList).toHaveBeenCalledTimes(1);
  });
});
