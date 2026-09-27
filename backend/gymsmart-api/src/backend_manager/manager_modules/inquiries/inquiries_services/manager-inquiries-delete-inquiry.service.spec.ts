// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { ManagerInquiriesDeleteInquiryService } from '@/backend_manager/manager_modules/inquiries/inquiries_services/manager-inquiries-delete-inquiry.service';

describe('ManagerInquiriesDeleteInquiryService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { deleteInquiry: jest.fn().mockResolvedValue(expected) };
    const service = new ManagerInquiriesDeleteInquiryService(dependency as never);
    const result = await service.deleteInquiry('test-id' as never);
    expect(result).toEqual(expected);
    expect(dependency.deleteInquiry).toHaveBeenCalledTimes(1);
    expect(dependency.deleteInquiry).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { deleteInquiry: jest.fn().mockRejectedValue(failure) };
    const service = new ManagerInquiriesDeleteInquiryService(dependency as never);
    await expect(service.deleteInquiry('test-id' as never)).rejects.toBe(failure);
    expect(dependency.deleteInquiry).toHaveBeenCalledTimes(1);
  });
});
