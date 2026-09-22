// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for PlansFetchMembershipOverviewService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> PlansFetchMembershipOverviewService.fetchMembershipOverview -> observable return/delegation.
import { PlansFetchMembershipOverviewService } from '@/backend_manager/modules/manager/plans/services/plans-fetch-membership-overview.service';

describe('PlansFetchMembershipOverviewService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'plans' } as const;
    const dependency = { fetchMembershipOverview: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new PlansFetchMembershipOverviewService(dependency as never);
    const result = await service.fetchMembershipOverview({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.fetchMembershipOverview as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
