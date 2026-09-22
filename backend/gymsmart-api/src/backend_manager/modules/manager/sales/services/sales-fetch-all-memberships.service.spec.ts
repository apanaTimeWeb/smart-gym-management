// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for SalesFetchAllMembershipsService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> SalesFetchAllMembershipsService.fetchAllMemberships -> observable return/delegation.
import { SalesFetchAllMembershipsService } from '@/backend_manager/modules/manager/sales/services/sales-fetch-all-memberships.service';

describe('SalesFetchAllMembershipsService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'sales' } as const;
    const dependency = { fetchAllMemberships: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new SalesFetchAllMembershipsService(dependency as never);
    const result = await service.fetchAllMemberships({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.fetchAllMemberships as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
