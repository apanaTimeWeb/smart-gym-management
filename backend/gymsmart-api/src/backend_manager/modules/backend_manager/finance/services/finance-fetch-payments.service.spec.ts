// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { FinanceFetchPaymentsService } from '@/backend_manager/modules/backend_manager/finance/services/finance-fetch-payments.service';

describe('FinanceFetchPaymentsService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findFinanceList: jest.fn().mockResolvedValue(expected) };
    const service = new FinanceFetchPaymentsService(dependency as never);
    const result = await service.fetchPayments({} as never);
    expect(result).toEqual(expected);
    expect(dependency.findFinanceList).toHaveBeenCalledTimes(1);
    expect(dependency.findFinanceList).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findFinanceList: jest.fn().mockRejectedValue(failure) };
    const service = new FinanceFetchPaymentsService(dependency as never);
    await expect(service.fetchPayments({} as never)).rejects.toBe(failure);
    expect(dependency.findFinanceList).toHaveBeenCalledTimes(1);
  });
});
