// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for CommunicationsFetchChurnKPIsService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> CommunicationsFetchChurnKPIsService.fetchChurnKPIs -> observable return/delegation.
import { CommunicationsFetchChurnKPIsService } from '@/backend_manager/modules/manager/communications/services/communications-fetch-churn-k-p-is.service';

describe('CommunicationsFetchChurnKPIsService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'communications' } as const;
    const dependency = { fetchChurnKPIs: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new CommunicationsFetchChurnKPIsService(dependency as never);
    const result = await service.fetchChurnKPIs({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.fetchChurnKPIs as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
