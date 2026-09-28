// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { FinanceFindPaymentsByMemberService } from '@/backend_manager/manager_modules/finance/finance_services/manager-finance-find-payments-by-member.service';

describe('FinanceFindPaymentsByMemberService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findFinanceList: jest.fn().mockResolvedValue(expected) };
    const service = new FinanceFindPaymentsByMemberService(dependency as never);
    const result = await service.findPaymentsByMember('test-id' as never, {} as never);
    expect(result).toEqual(expected);
    expect(dependency.findFinanceList).toHaveBeenCalledTimes(1);
    expect(dependency.findFinanceList).toHaveBeenCalledWith(expect.anything(), expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findFinanceList: jest.fn().mockRejectedValue(failure) };
    const service = new FinanceFindPaymentsByMemberService(dependency as never);
    await expect(service.findPaymentsByMember('test-id' as never, {} as never)).rejects.toBe(failure);
    expect(dependency.findFinanceList).toHaveBeenCalledTimes(1);
  });
});
