// RESPONSIBILITY: Co-located behavioral unit proof for SalesFetchSalesOverviewService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> SalesFetchSalesOverviewService.fetchSalesOverview -> observable return/delegation.
import { SalesFetchSalesOverviewService } from '@/modules/manager/sales/services/sales-fetch-sales-overview.service.ts';

describe('SalesFetchSalesOverviewService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'sales' } as const;
    const dependency = { fetchSalesOverview: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new SalesFetchSalesOverviewService(dependency as never);
    const result = await service.fetchSalesOverview({} as never);
    expect(result).toEqual(expected);
    expect((dependency.fetchSalesOverview as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
