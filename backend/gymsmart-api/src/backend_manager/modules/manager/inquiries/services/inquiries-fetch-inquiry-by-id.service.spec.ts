// RESPONSIBILITY: Co-located behavioral unit proof for InquiriesFetchInquiryByIdService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> InquiriesFetchInquiryByIdService.fetchInquiryById -> observable return/delegation.
import { InquiriesFetchInquiryByIdService } from '@/modules/manager/inquiries/services/inquiries-fetch-inquiry-by-id.service.ts';

describe('InquiriesFetchInquiryByIdService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'inquiries' } as const;
    const dependency = { fetchInquiryById: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new InquiriesFetchInquiryByIdService(dependency as never);
    const result = await service.fetchInquiryById({} as never);
    expect(result).toEqual(expected);
    expect((dependency.fetchInquiryById as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
