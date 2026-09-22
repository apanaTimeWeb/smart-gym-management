// RESPONSIBILITY: Co-located behavioral unit proof for InquiriesFetchInquiryPlansService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> InquiriesFetchInquiryPlansService.fetchInquiryPlans -> observable return/delegation.
import { InquiriesFetchInquiryPlansService } from '@/modules/manager/inquiries/services/inquiries-fetch-inquiry-plans.service.ts';

describe('InquiriesFetchInquiryPlansService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'inquiries' } as const;
    const dependency = { fetchInquiryPlans: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new InquiriesFetchInquiryPlansService(dependency as never);
    const result = await service.fetchInquiryPlans({} as never);
    expect(result).toEqual(expected);
    expect((dependency.fetchInquiryPlans as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
