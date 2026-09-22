// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for StoreDeleteProductService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> StoreDeleteProductService.deleteProduct -> observable return/delegation.
import { StoreDeleteProductService } from '@/backend_manager/modules/manager/store/services/store-delete-product.service';

describe('StoreDeleteProductService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'store' } as const;
    const dependency = { deleteProduct: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new StoreDeleteProductService(dependency as never);
    const result = await service.deleteProduct({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.deleteProduct as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
