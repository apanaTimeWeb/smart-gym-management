// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { PlansFindPlansService } from '@/backend_manager/manager_modules/plans/plans_services/manager-plans-find-plans.service';

describe('PlansFindPlansService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findPlansList: jest.fn().mockResolvedValue(expected) };
    const service = new PlansFindPlansService(dependency as never);
    const result = await service.findPlans({} as never);
    expect(result).toEqual(expected);
    expect(dependency.findPlansList).toHaveBeenCalledTimes(1);
    expect(dependency.findPlansList).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findPlansList: jest.fn().mockRejectedValue(failure) };
    const service = new PlansFindPlansService(dependency as never);
    await expect(service.findPlans({} as never)).rejects.toBe(failure);
    expect(dependency.findPlansList).toHaveBeenCalledTimes(1);
  });
});
