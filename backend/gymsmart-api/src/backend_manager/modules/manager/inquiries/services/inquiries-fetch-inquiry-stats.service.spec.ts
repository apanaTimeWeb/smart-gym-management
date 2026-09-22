// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for InquiriesFetchInquiryStatsService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> InquiriesFetchInquiryStatsService.fetchInquiryStats -> observable return/delegation.
import { InquiriesFetchInquiryStatsService } from '@/backend_manager/modules/manager/inquiries/services/inquiries-fetch-inquiry-stats.service';

describe('InquiriesFetchInquiryStatsService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'inquiries' } as const;
    const dependency = { fetchInquiryStats: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new InquiriesFetchInquiryStatsService(dependency as never);
    const result = await service.fetchInquiryStats({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.fetchInquiryStats as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
