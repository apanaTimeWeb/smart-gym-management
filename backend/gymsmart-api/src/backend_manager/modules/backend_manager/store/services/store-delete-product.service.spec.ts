// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { StoreDeleteProductService } from '@/backend_manager/modules/backend_manager/store/services/store-delete-product.service';

describe('StoreDeleteProductService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { softDeleteStoreById: jest.fn().mockResolvedValue(expected) };
    const service = new StoreDeleteProductService(dependency as never);
    const result = await service.deleteProduct('test-id' as never);
    expect(result).toEqual(expected);
    expect(dependency.softDeleteStoreById).toHaveBeenCalledTimes(1);
    expect(dependency.softDeleteStoreById).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { softDeleteStoreById: jest.fn().mockRejectedValue(failure) };
    const service = new StoreDeleteProductService(dependency as never);
    await expect(service.deleteProduct('test-id' as never)).rejects.toBe(failure);
    expect(dependency.softDeleteStoreById).toHaveBeenCalledTimes(1);
  });
});
