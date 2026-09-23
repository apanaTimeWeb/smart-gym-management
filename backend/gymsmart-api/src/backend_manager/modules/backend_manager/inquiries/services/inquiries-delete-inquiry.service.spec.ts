// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { InquiriesDeleteInquiryService } from '@/backend_manager/modules/backend_manager/inquiries/services/inquiries-delete-inquiry.service';

describe('InquiriesDeleteInquiryService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { softDeleteInquiriesById: jest.fn().mockResolvedValue(expected) };
    const service = new InquiriesDeleteInquiryService(dependency as never);
    const result = await service.deleteInquiry('test-id' as never);
    expect(result).toEqual(expected);
    expect(dependency.softDeleteInquiriesById).toHaveBeenCalledTimes(1);
    expect(dependency.softDeleteInquiriesById).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { softDeleteInquiriesById: jest.fn().mockRejectedValue(failure) };
    const service = new InquiriesDeleteInquiryService(dependency as never);
    await expect(service.deleteInquiry('test-id' as never)).rejects.toBe(failure);
    expect(dependency.softDeleteInquiriesById).toHaveBeenCalledTimes(1);
  });
});
