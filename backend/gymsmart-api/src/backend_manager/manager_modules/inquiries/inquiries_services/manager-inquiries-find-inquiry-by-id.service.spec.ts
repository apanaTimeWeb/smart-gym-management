// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { ManagerInquiriesFindInquiryByIdService } from '@/backend_manager/manager_modules/inquiries/inquiries_services/manager-inquiries-find-inquiry-by-id.service';

describe('ManagerInquiriesFindInquiryByIdService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findInquiriesByIdOrThrow: jest.fn().mockResolvedValue(expected) };
    const service = new ManagerInquiriesFindInquiryByIdService(dependency as never);
    const result = await service.findInquiryById('test-id' as never, {} as never);
    expect(result).toEqual(expected);
    expect(dependency.findInquiriesByIdOrThrow).toHaveBeenCalledTimes(1);
    expect(dependency.findInquiriesByIdOrThrow).toHaveBeenCalledWith(expect.anything(), expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findInquiriesByIdOrThrow: jest.fn().mockRejectedValue(failure) };
    const service = new ManagerInquiriesFindInquiryByIdService(dependency as never);
    await expect(service.findInquiryById('test-id' as never, {} as never)).rejects.toBe(failure);
    expect(dependency.findInquiriesByIdOrThrow).toHaveBeenCalledTimes(1);
  });
});
