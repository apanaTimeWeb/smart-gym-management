// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { PtFetchPackagesService } from '@/backend_manager/modules/backend_manager/pt/services/pt-fetch-packages.service';

describe('PtFetchPackagesService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findPtList: jest.fn().mockResolvedValue(expected) };
    const service = new PtFetchPackagesService(dependency as never);
    const result = await service.fetchPackages({} as never);
    expect(result).toEqual(expected);
    expect(dependency.findPtList).toHaveBeenCalledTimes(1);
    expect(dependency.findPtList).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findPtList: jest.fn().mockRejectedValue(failure) };
    const service = new PtFetchPackagesService(dependency as never);
    await expect(service.fetchPackages({} as never)).rejects.toBe(failure);
    expect(dependency.findPtList).toHaveBeenCalledTimes(1);
  });
});
