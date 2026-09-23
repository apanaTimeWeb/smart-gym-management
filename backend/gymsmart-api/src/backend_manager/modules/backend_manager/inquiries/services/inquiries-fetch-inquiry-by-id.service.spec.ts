// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { InquiriesFetchInquiryByIdService } from '@/backend_manager/modules/backend_manager/inquiries/services/inquiries-fetch-inquiry-by-id.service';

describe('InquiriesFetchInquiryByIdService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findInquiriesByIdOrThrow: jest.fn().mockResolvedValue(expected) };
    const service = new InquiriesFetchInquiryByIdService(dependency as never);
    const result = await service.fetchInquiryById('test-id' as never, {} as never);
    expect(result).toEqual(expected);
    expect(dependency.findInquiriesByIdOrThrow).toHaveBeenCalledTimes(1);
    expect(dependency.findInquiriesByIdOrThrow).toHaveBeenCalledWith(expect.anything(), expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findInquiriesByIdOrThrow: jest.fn().mockRejectedValue(failure) };
    const service = new InquiriesFetchInquiryByIdService(dependency as never);
    await expect(service.fetchInquiryById('test-id' as never, {} as never)).rejects.toBe(failure);
    expect(dependency.findInquiriesByIdOrThrow).toHaveBeenCalledTimes(1);
  });
});
