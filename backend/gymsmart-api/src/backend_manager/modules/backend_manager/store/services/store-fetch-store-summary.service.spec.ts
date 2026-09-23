// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { StoreFetchStoreSummaryService } from '@/backend_manager/modules/backend_manager/store/services/store-fetch-store-summary.service';

describe('StoreFetchStoreSummaryService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findStoreList: jest.fn().mockResolvedValue(expected) };
    const service = new StoreFetchStoreSummaryService(dependency as never);
    const result = await service.fetchStoreSummary({} as never);
    expect(result).toEqual(expected);
    expect(dependency.findStoreList).toHaveBeenCalledTimes(1);
    expect(dependency.findStoreList).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findStoreList: jest.fn().mockRejectedValue(failure) };
    const service = new StoreFetchStoreSummaryService(dependency as never);
    await expect(service.fetchStoreSummary({} as never)).rejects.toBe(failure);
    expect(dependency.findStoreList).toHaveBeenCalledTimes(1);
  });
});
