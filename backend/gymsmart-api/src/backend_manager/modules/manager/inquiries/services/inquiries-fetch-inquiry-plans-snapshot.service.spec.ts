// RESPONSIBILITY: Co-located behavioral unit proof for InquiriesFetchInquiryPlansSnapshotService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> InquiriesFetchInquiryPlansSnapshotService.fetchInquiryPlansSnapshot -> observable return/delegation.
import { InquiriesFetchInquiryPlansSnapshotService } from '@/modules/manager/inquiries/services/inquiries-fetch-inquiry-plans-snapshot.service.ts';

describe('InquiriesFetchInquiryPlansSnapshotService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'inquiries' } as const;
    const dependency = { fetchInquiryPlansSnapshot: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new InquiriesFetchInquiryPlansSnapshotService(dependency as never);
    const result = await service.fetchInquiryPlansSnapshot({} as never);
    expect(result).toEqual(expected);
    expect((dependency.fetchInquiryPlansSnapshot as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
