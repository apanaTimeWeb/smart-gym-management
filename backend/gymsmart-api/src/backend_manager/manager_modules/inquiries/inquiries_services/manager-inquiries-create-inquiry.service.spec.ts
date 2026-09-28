// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { ManagerInquiriesCreateInquiryService } from '@/backend_manager/manager_modules/inquiries/inquiries_services/manager-inquiries-create-inquiry.service';

describe('ManagerInquiriesCreateInquiryService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { createInquiry: jest.fn().mockResolvedValue(expected) };
    const service = new ManagerInquiriesCreateInquiryService(dependency as never);
    const result = await service.createInquiry({} as never);
    expect(result).toEqual(expected);
    expect(dependency.createInquiry).toHaveBeenCalledTimes(1);
    expect(dependency.createInquiry).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { createInquiry: jest.fn().mockRejectedValue(failure) };
    const service = new ManagerInquiriesCreateInquiryService(dependency as never);
    await expect(service.createInquiry({} as never)).rejects.toBe(failure);
    expect(dependency.createInquiry).toHaveBeenCalledTimes(1);
  });
});
