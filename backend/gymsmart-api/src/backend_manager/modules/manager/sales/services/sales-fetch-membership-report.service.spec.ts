// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for SalesFetchMembershipReportService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> SalesFetchMembershipReportService.fetchMembershipReport -> observable return/delegation.
import { SalesFetchMembershipReportService } from '@/backend_manager/modules/manager/sales/services/sales-fetch-membership-report.service';

describe('SalesFetchMembershipReportService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'sales' } as const;
    const dependency = { fetchMembershipReport: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new SalesFetchMembershipReportService(dependency as never);
    const result = await service.fetchMembershipReport({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.fetchMembershipReport as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
