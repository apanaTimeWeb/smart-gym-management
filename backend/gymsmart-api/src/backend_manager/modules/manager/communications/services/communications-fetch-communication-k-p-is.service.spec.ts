// RESPONSIBILITY: Co-located behavioral unit proof for CommunicationsFetchCommunicationKPIsService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> CommunicationsFetchCommunicationKPIsService.fetchCommunicationKPIs -> observable return/delegation.
import { CommunicationsFetchCommunicationKPIsService } from '@/modules/manager/communications/services/communications-fetch-communication-k-p-is.service.ts';

describe('CommunicationsFetchCommunicationKPIsService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'communications' } as const;
    const dependency = { fetchCommunicationKPIs: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new CommunicationsFetchCommunicationKPIsService(dependency as never);
    const result = await service.fetchCommunicationKPIs({} as never);
    expect(result).toEqual(expected);
    expect((dependency.fetchCommunicationKPIs as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
