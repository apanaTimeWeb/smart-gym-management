// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { FinanceFetchPaymentsByMemberService } from '@/backend_manager/modules/backend_manager/finance/services/finance-fetch-payments-by-member.service';

describe('FinanceFetchPaymentsByMemberService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findFinanceList: jest.fn().mockResolvedValue(expected) };
    const service = new FinanceFetchPaymentsByMemberService(dependency as never);
    const result = await service.fetchPaymentsByMember('test-id' as never, {} as never);
    expect(result).toEqual(expected);
    expect(dependency.findFinanceList).toHaveBeenCalledTimes(1);
    expect(dependency.findFinanceList).toHaveBeenCalledWith(expect.anything(), expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findFinanceList: jest.fn().mockRejectedValue(failure) };
    const service = new FinanceFetchPaymentsByMemberService(dependency as never);
    await expect(service.fetchPaymentsByMember('test-id' as never, {} as never)).rejects.toBe(failure);
    expect(dependency.findFinanceList).toHaveBeenCalledTimes(1);
  });
});
