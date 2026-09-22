// RESPONSIBILITY: Co-located behavioral unit proof for StoreFetchProductsService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> StoreFetchProductsService.fetchProducts -> observable return/delegation.
import { StoreFetchProductsService } from '@/modules/manager/store/services/store-fetch-products.service.ts';

describe('StoreFetchProductsService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'store' } as const;
    const dependency = { fetchProducts: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new StoreFetchProductsService(dependency as never);
    const result = await service.fetchProducts({} as never);
    expect(result).toEqual(expected);
    expect((dependency.fetchProducts as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
