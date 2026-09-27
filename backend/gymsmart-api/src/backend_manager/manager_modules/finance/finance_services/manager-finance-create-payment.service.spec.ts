// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { FinanceCreatePaymentService } from '@/backend_manager/manager_modules/finance/finance_services/manager-finance-create-payment.service';

describe('FinanceCreatePaymentService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { createPayment: jest.fn().mockResolvedValue(expected) };
    const service = new FinanceCreatePaymentService(dependency as never);
    const result = await service.createPayment({} as never);
    expect(result).toEqual(expected);
    expect(dependency.createPayment).toHaveBeenCalledTimes(1);
    expect(dependency.createPayment).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { createPayment: jest.fn().mockRejectedValue(failure) };
    const service = new FinanceCreatePaymentService(dependency as never);
    await expect(service.createPayment({} as never)).rejects.toBe(failure);
    expect(dependency.createPayment).toHaveBeenCalledTimes(1);
  });
});
