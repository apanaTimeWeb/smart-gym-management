// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { StoreCreateOrderService } from '@/backend_manager/modules/backend_manager/store/services/store-create-order.service';

describe('StoreCreateOrderService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { createStore: jest.fn().mockResolvedValue(expected) };
    const service = new StoreCreateOrderService(dependency as never);
    const result = await service.createOrder({} as never);
    expect(result).toEqual(expected);
    expect(dependency.createStore).toHaveBeenCalledTimes(1);
    expect(dependency.createStore).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { createStore: jest.fn().mockRejectedValue(failure) };
    const service = new StoreCreateOrderService(dependency as never);
    await expect(service.createOrder({} as never)).rejects.toBe(failure);
    expect(dependency.createStore).toHaveBeenCalledTimes(1);
  });
});
