// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for StoreCreateOrderService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> StoreCreateOrderService.createOrder -> observable return/delegation.
import { StoreCreateOrderService } from '@/backend_manager/modules/manager/store/services/store-create-order.service';

describe('StoreCreateOrderService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'store' } as const;
    const dependency = { createOrder: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new StoreCreateOrderService(dependency as never);
    const result = await service.createOrder({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.createOrder as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
