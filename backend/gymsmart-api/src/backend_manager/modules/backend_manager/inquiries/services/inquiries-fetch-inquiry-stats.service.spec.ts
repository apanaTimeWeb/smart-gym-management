// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { InquiriesFetchInquiryStatsService } from '@/backend_manager/modules/backend_manager/inquiries/services/inquiries-fetch-inquiry-stats.service';

describe('InquiriesFetchInquiryStatsService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findInquiriesList: jest.fn().mockResolvedValue(expected) };
    const service = new InquiriesFetchInquiryStatsService(dependency as never);
    const result = await service.fetchInquiryStats({} as never);
    expect(result).toEqual(expected);
    expect(dependency.findInquiriesList).toHaveBeenCalledTimes(1);
    expect(dependency.findInquiriesList).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findInquiriesList: jest.fn().mockRejectedValue(failure) };
    const service = new InquiriesFetchInquiryStatsService(dependency as never);
    await expect(service.fetchInquiryStats({} as never)).rejects.toBe(failure);
    expect(dependency.findInquiriesList).toHaveBeenCalledTimes(1);
  });
});
