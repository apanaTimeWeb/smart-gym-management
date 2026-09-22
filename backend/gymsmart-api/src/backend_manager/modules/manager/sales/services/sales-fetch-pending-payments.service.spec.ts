// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for SalesFetchPendingPaymentsService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> SalesFetchPendingPaymentsService.fetchPendingPayments -> observable return/delegation.
import { SalesFetchPendingPaymentsService } from '@/backend_manager/modules/manager/sales/services/sales-fetch-pending-payments.service';

describe('SalesFetchPendingPaymentsService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'sales' } as const;
    const dependency = { fetchPendingPayments: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new SalesFetchPendingPaymentsService(dependency as never);
    const result = await service.fetchPendingPayments({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.fetchPendingPayments as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
