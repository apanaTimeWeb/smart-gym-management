// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for StoreFetchStoreSummaryService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> StoreFetchStoreSummaryService.fetchStoreSummary -> observable return/delegation.
import { StoreFetchStoreSummaryService } from '@/backend_manager/modules/manager/store/services/store-fetch-store-summary.service';

describe('StoreFetchStoreSummaryService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'store' } as const;
    const dependency = { fetchStoreSummary: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new StoreFetchStoreSummaryService(dependency as never);
    const result = await service.fetchStoreSummary({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.fetchStoreSummary as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
