// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { PlansFetchMembershipOverviewService } from '@/backend_manager/modules/backend_manager/plans/services/plans-fetch-membership-overview.service';

describe('PlansFetchMembershipOverviewService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findPlansList: jest.fn().mockResolvedValue(expected) };
    const service = new PlansFetchMembershipOverviewService(dependency as never);
    const result = await service.fetchMembershipOverview({} as never);
    expect(result).toEqual(expected);
    expect(dependency.findPlansList).toHaveBeenCalledTimes(1);
    expect(dependency.findPlansList).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findPlansList: jest.fn().mockRejectedValue(failure) };
    const service = new PlansFetchMembershipOverviewService(dependency as never);
    await expect(service.fetchMembershipOverview({} as never)).rejects.toBe(failure);
    expect(dependency.findPlansList).toHaveBeenCalledTimes(1);
  });
});
