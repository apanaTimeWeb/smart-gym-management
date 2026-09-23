// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { InquiriesUpdateInquiryService } from '@/backend_manager/modules/backend_manager/inquiries/services/inquiries-update-inquiry.service';

describe('InquiriesUpdateInquiryService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { updateInquiriesById: jest.fn().mockResolvedValue(expected) };
    const service = new InquiriesUpdateInquiryService(dependency as never);
    const result = await service.updateInquiry({} as never, 'test-id' as never);
    expect(result).toEqual(expected);
    expect(dependency.updateInquiriesById).toHaveBeenCalledTimes(1);
    expect(dependency.updateInquiriesById).toHaveBeenCalledWith(expect.anything(), expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { updateInquiriesById: jest.fn().mockRejectedValue(failure) };
    const service = new InquiriesUpdateInquiryService(dependency as never);
    await expect(service.updateInquiry({} as never, 'test-id' as never)).rejects.toBe(failure);
    expect(dependency.updateInquiriesById).toHaveBeenCalledTimes(1);
  });
});
