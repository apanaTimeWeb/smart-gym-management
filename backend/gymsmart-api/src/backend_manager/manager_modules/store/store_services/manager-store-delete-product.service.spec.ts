// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { ManagerStoreDeleteProductService } from '@/backend_manager/manager_modules/store/store_services/manager-store-delete-product.service';

describe('ManagerStoreDeleteProductService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { deleteStoreById: jest.fn().mockResolvedValue(expected) };
    const service = new ManagerStoreDeleteProductService(dependency as never);
    const result = await service.deleteProduct('test-id' as never);
    expect(result).toEqual(expected);
    expect(dependency.deleteStoreById).toHaveBeenCalledTimes(1);
    expect(dependency.deleteStoreById).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { deleteStoreById: jest.fn().mockRejectedValue(failure) };
    const service = new ManagerStoreDeleteProductService(dependency as never);
    await expect(service.deleteProduct('test-id' as never)).rejects.toBe(failure);
    expect(dependency.deleteStoreById).toHaveBeenCalledTimes(1);
  });
});
