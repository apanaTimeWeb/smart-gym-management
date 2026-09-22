// RESPONSIBILITY: Co-located behavioral unit proof for CommunicationsFetchAutomationsService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> CommunicationsFetchAutomationsService.fetchAutomations -> observable return/delegation.
import { CommunicationsFetchAutomationsService } from '@/modules/manager/communications/services/communications-fetch-automations.service.ts';

describe('CommunicationsFetchAutomationsService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'communications' } as const;
    const dependency = { fetchAutomations: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new CommunicationsFetchAutomationsService(dependency as never);
    const result = await service.fetchAutomations({} as never);
    expect(result).toEqual(expected);
    expect((dependency.fetchAutomations as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
