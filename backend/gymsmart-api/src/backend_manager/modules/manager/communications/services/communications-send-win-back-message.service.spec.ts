// RESPONSIBILITY: Co-located behavioral unit proof for CommunicationsSendWinBackMessageService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> CommunicationsSendWinBackMessageService.sendWinBackMessage -> observable return/delegation.
import { CommunicationsSendWinBackMessageService } from '@/modules/manager/communications/services/communications-send-win-back-message.service.ts';

describe('CommunicationsSendWinBackMessageService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'communications' } as const;
    const dependency = { sendWinBackMessage: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new CommunicationsSendWinBackMessageService(dependency as never);
    const result = await service.sendWinBackMessage({} as never);
    expect(result).toEqual(expected);
    expect((dependency.sendWinBackMessage as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
