// RESPONSIBILITY: Co-located behavioral unit proof for StoreUpdateProductService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> StoreUpdateProductService.updateProduct -> observable return/delegation.
import { StoreUpdateProductService } from '@/modules/manager/store/services/store-update-product.service.ts';

describe('StoreUpdateProductService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'store' } as const;
    const dependency = { updateProduct: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new StoreUpdateProductService(dependency as never);
    const result = await service.updateProduct({} as never);
    expect(result).toEqual(expected);
    expect((dependency.updateProduct as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
