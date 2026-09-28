// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { ManagerStoreFindProductsService } from '@/backend_manager/manager_modules/store/store_services/manager-store-find-products.service';

describe('ManagerStoreFindProductsService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findStoreList: jest.fn().mockResolvedValue(expected) };
    const service = new ManagerStoreFindProductsService(dependency as never);
    const result = await service.findProducts({} as never);
    expect(result).toEqual(expected);
    expect(dependency.findStoreList).toHaveBeenCalledTimes(1);
    expect(dependency.findStoreList).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findStoreList: jest.fn().mockRejectedValue(failure) };
    const service = new ManagerStoreFindProductsService(dependency as never);
    await expect(service.findProducts({} as never)).rejects.toBe(failure);
    expect(dependency.findStoreList).toHaveBeenCalledTimes(1);
  });
});
