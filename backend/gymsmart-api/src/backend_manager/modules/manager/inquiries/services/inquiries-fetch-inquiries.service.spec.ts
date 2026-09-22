// RESPONSIBILITY: Co-located behavioral unit proof for InquiriesFetchInquiriesService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> InquiriesFetchInquiriesService.fetchInquiries -> observable return/delegation.
import { InquiriesFetchInquiriesService } from '@/modules/manager/inquiries/services/inquiries-fetch-inquiries.service.ts';

describe('InquiriesFetchInquiriesService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'inquiries' } as const;
    const dependency = { fetchInquiries: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new InquiriesFetchInquiriesService(dependency as never);
    const result = await service.fetchInquiries({} as never);
    expect(result).toEqual(expected);
    expect((dependency.fetchInquiries as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
