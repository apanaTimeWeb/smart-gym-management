// RESPONSIBILITY: Co-located behavioral unit proof for InquiriesFetchInquiryStatsService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> InquiriesFetchInquiryStatsService.fetchInquiryStats -> observable return/delegation.
import { InquiriesFetchInquiryStatsService } from '@/modules/manager/inquiries/services/inquiries-fetch-inquiry-stats.service.ts';

describe('InquiriesFetchInquiryStatsService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'inquiries' } as const;
    const dependency = { fetchInquiryStats: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new InquiriesFetchInquiryStatsService(dependency as never);
    const result = await service.fetchInquiryStats({} as never);
    expect(result).toEqual(expected);
    expect((dependency.fetchInquiryStats as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
