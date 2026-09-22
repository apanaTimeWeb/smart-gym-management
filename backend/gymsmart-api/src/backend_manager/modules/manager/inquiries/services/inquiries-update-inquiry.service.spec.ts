// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for InquiriesUpdateInquiryService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> InquiriesUpdateInquiryService.updateInquiry -> observable return/delegation.
import { InquiriesUpdateInquiryService } from '@/backend_manager/modules/manager/inquiries/services/inquiries-update-inquiry.service';

describe('InquiriesUpdateInquiryService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'inquiries' } as const;
    const dependency = { updateInquiry: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new InquiriesUpdateInquiryService(dependency as never);
    const result = await service.updateInquiry({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.updateInquiry as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
