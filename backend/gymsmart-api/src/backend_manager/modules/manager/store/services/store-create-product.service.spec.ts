// RESPONSIBILITY: Co-located behavioral unit proof for StoreCreateProductService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> StoreCreateProductService.createProduct -> observable return/delegation.
import { StoreCreateProductService } from '@/modules/manager/store/services/store-create-product.service.ts';

describe('StoreCreateProductService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'store' } as const;
    const dependency = { createProduct: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new StoreCreateProductService(dependency as never);
    const result = await service.createProduct({} as never);
    expect(result).toEqual(expected);
    expect((dependency.createProduct as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
