// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { PlansFindMembershipOverviewService } from '@/backend_manager/manager_modules/plans/plans_services/manager-plans-find-membership-overview.service';

describe('PlansFindMembershipOverviewService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findPlansList: jest.fn().mockResolvedValue(expected) };
    const service = new PlansFindMembershipOverviewService(dependency as never);
    const result = await service.findMembershipOverview({} as never);
    expect(result).toEqual(expected);
    expect(dependency.findPlansList).toHaveBeenCalledTimes(1);
    expect(dependency.findPlansList).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findPlansList: jest.fn().mockRejectedValue(failure) };
    const service = new PlansFindMembershipOverviewService(dependency as never);
    await expect(service.findMembershipOverview({} as never)).rejects.toBe(failure);
    expect(dependency.findPlansList).toHaveBeenCalledTimes(1);
  });
});
