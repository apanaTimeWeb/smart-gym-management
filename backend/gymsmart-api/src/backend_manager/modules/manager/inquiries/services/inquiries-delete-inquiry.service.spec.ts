// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for InquiriesDeleteInquiryService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> InquiriesDeleteInquiryService.deleteInquiry -> observable return/delegation.
import { InquiriesDeleteInquiryService } from '@/backend_manager/modules/manager/inquiries/services/inquiries-delete-inquiry.service';

describe('InquiriesDeleteInquiryService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'inquiries' } as const;
    const dependency = { deleteInquiry: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new InquiriesDeleteInquiryService(dependency as never);
    const result = await service.deleteInquiry({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.deleteInquiry as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
