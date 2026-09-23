// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { SalesFetchMembershipReportService } from '@/backend_manager/modules/backend_manager/sales/services/sales-fetch-membership-report.service';

describe('SalesFetchMembershipReportService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findSalesList: jest.fn().mockResolvedValue(expected) };
    const service = new SalesFetchMembershipReportService(dependency as never);
    const result = await service.fetchMembershipReport({} as never);
    expect(result).toEqual(expected);
    expect(dependency.findSalesList).toHaveBeenCalledTimes(1);
    expect(dependency.findSalesList).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findSalesList: jest.fn().mockRejectedValue(failure) };
    const service = new SalesFetchMembershipReportService(dependency as never);
    await expect(service.fetchMembershipReport({} as never)).rejects.toBe(failure);
    expect(dependency.findSalesList).toHaveBeenCalledTimes(1);
  });
});
