// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for LibraryFetchDietPlansService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> LibraryFetchDietPlansService.fetchDietPlans -> observable return/delegation.
import { LibraryFetchDietPlansService } from '@/backend_manager/modules/manager/library/services/library-fetch-diet-plans.service';

describe('LibraryFetchDietPlansService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'library' } as const;
    const dependency = { fetchDietPlans: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new LibraryFetchDietPlansService(dependency as never);
    const result = await service.fetchDietPlans({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.fetchDietPlans as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
