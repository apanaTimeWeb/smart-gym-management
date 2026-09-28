// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { SalesFindMembershipReportService } from '@/backend_manager/manager_modules/sales/sales_services/manager-sales-find-membership-report.service';

describe('SalesFindMembershipReportService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findSalesList: jest.fn().mockResolvedValue(expected) };
    const service = new SalesFindMembershipReportService(dependency as never);
    const result = await service.findMembershipReport({} as never);
    expect(result).toEqual(expected);
    expect(dependency.findSalesList).toHaveBeenCalledTimes(1);
    expect(dependency.findSalesList).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findSalesList: jest.fn().mockRejectedValue(failure) };
    const service = new SalesFindMembershipReportService(dependency as never);
    await expect(service.findMembershipReport({} as never)).rejects.toBe(failure);
    expect(dependency.findSalesList).toHaveBeenCalledTimes(1);
  });
});
