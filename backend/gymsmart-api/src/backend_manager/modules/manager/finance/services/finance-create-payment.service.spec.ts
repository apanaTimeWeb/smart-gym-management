// RESPONSIBILITY: Co-located behavioral unit proof for FinanceCreatePaymentService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> FinanceCreatePaymentService.createPayment -> observable return/delegation.
import { FinanceCreatePaymentService } from '@/modules/manager/finance/services/finance-create-payment.service.ts';

describe('FinanceCreatePaymentService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'finance' } as const;
    const dependency = { createPayment: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new FinanceCreatePaymentService(dependency as never);
    const result = await service.createPayment({} as never);
    expect(result).toEqual(expected);
    expect((dependency.createPayment as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
