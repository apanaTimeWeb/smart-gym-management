// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for FinanceFetchPaymentsService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> FinanceFetchPaymentsService.fetchPayments -> observable return/delegation.
import { FinanceFetchPaymentsService } from '@/backend_manager/modules/manager/finance/services/finance-fetch-payments.service';

describe('FinanceFetchPaymentsService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'finance' } as const;
    const dependency = { fetchPayments: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new FinanceFetchPaymentsService(dependency as never);
    const result = await service.fetchPayments({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.fetchPayments as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
