// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for StoreFetchOrdersService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> StoreFetchOrdersService.fetchOrders -> observable return/delegation.
import { StoreFetchOrdersService } from '@/backend_manager/modules/manager/store/services/store-fetch-orders.service';

describe('StoreFetchOrdersService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'store' } as const;
    const dependency = { fetchOrders: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new StoreFetchOrdersService(dependency as never);
    const result = await service.fetchOrders({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.fetchOrders as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
