// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { HrFetchLedgerService } from '@/backend_manager/modules/backend_manager/hr/services/hr-fetch-ledger.service';

describe('HrFetchLedgerService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findHrList: jest.fn().mockResolvedValue(expected) };
    const service = new HrFetchLedgerService(dependency as never);
    const result = await service.fetchLedger('test-id' as never, {} as never);
    expect(result).toEqual(expected);
    expect(dependency.findHrList).toHaveBeenCalledTimes(1);
    expect(dependency.findHrList).toHaveBeenCalledWith(expect.anything(), expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findHrList: jest.fn().mockRejectedValue(failure) };
    const service = new HrFetchLedgerService(dependency as never);
    await expect(service.fetchLedger('test-id' as never, {} as never)).rejects.toBe(failure);
    expect(dependency.findHrList).toHaveBeenCalledTimes(1);
  });
});
