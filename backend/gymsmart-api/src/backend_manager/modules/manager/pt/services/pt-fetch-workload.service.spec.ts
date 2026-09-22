// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for PtFetchWorkloadService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> PtFetchWorkloadService.fetchWorkload -> observable return/delegation.
import { PtFetchWorkloadService } from '@/backend_manager/modules/manager/pt/services/pt-fetch-workload.service';

describe('PtFetchWorkloadService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'pt' } as const;
    const dependency = { fetchWorkload: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new PtFetchWorkloadService(dependency as never);
    const result = await service.fetchWorkload({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.fetchWorkload as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
