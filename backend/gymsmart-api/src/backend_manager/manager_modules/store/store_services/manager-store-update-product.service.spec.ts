// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { ManagerStoreUpdateProductService } from '@/backend_manager/manager_modules/store/store_services/manager-store-update-product.service';

describe('ManagerStoreUpdateProductService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { updateStoreById: jest.fn().mockResolvedValue(expected) };
    const service = new ManagerStoreUpdateProductService(dependency as never);
    const result = await service.updateProduct({} as never, 'test-id' as never);
    expect(result).toEqual(expected);
    expect(dependency.updateStoreById).toHaveBeenCalledTimes(1);
    expect(dependency.updateStoreById).toHaveBeenCalledWith(expect.anything(), expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { updateStoreById: jest.fn().mockRejectedValue(failure) };
    const service = new ManagerStoreUpdateProductService(dependency as never);
    await expect(service.updateProduct({} as never, 'test-id' as never)).rejects.toBe(failure);
    expect(dependency.updateStoreById).toHaveBeenCalledTimes(1);
  });
});
