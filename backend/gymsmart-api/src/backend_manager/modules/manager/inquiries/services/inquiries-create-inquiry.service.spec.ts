// RESPONSIBILITY: Co-located behavioral unit proof for InquiriesCreateInquiryService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> InquiriesCreateInquiryService.createInquiry -> observable return/delegation.
import { InquiriesCreateInquiryService } from '@/modules/manager/inquiries/services/inquiries-create-inquiry.service.ts';

describe('InquiriesCreateInquiryService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'inquiries' } as const;
    const dependency = { createInquiry: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new InquiriesCreateInquiryService(dependency as never);
    const result = await service.createInquiry({} as never);
    expect(result).toEqual(expected);
    expect((dependency.createInquiry as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
