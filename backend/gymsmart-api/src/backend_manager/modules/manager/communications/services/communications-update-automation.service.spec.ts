// RESPONSIBILITY: Co-located behavioral unit proof for CommunicationsUpdateAutomationService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> CommunicationsUpdateAutomationService.updateAutomation -> observable return/delegation.
import { CommunicationsUpdateAutomationService } from '@/modules/manager/communications/services/communications-update-automation.service.ts';

describe('CommunicationsUpdateAutomationService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'communications' } as const;
    const dependency = { updateAutomation: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new CommunicationsUpdateAutomationService(dependency as never);
    const result = await service.updateAutomation({} as never);
    expect(result).toEqual(expected);
    expect((dependency.updateAutomation as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
