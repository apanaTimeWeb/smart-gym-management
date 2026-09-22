// RESPONSIBILITY: Co-located behavioral unit proof for CommunicationsFetchSegmentRecipientsService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> CommunicationsFetchSegmentRecipientsService.fetchSegmentRecipients -> observable return/delegation.
import { CommunicationsFetchSegmentRecipientsService } from '@/modules/manager/communications/services/communications-fetch-segment-recipients.service.ts';

describe('CommunicationsFetchSegmentRecipientsService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'communications' } as const;
    const dependency = { fetchSegmentRecipients: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new CommunicationsFetchSegmentRecipientsService(dependency as never);
    const result = await service.fetchSegmentRecipients({} as never);
    expect(result).toEqual(expected);
    expect((dependency.fetchSegmentRecipients as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
