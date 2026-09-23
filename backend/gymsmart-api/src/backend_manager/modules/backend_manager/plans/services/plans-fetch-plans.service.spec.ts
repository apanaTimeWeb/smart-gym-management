// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { PlansFetchPlansService } from '@/backend_manager/modules/backend_manager/plans/services/plans-fetch-plans.service';

describe('PlansFetchPlansService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findPlansList: jest.fn().mockResolvedValue(expected) };
    const service = new PlansFetchPlansService(dependency as never);
    const result = await service.fetchPlans({} as never);
    expect(result).toEqual(expected);
    expect(dependency.findPlansList).toHaveBeenCalledTimes(1);
    expect(dependency.findPlansList).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findPlansList: jest.fn().mockRejectedValue(failure) };
    const service = new PlansFetchPlansService(dependency as never);
    await expect(service.fetchPlans({} as never)).rejects.toBe(failure);
    expect(dependency.findPlansList).toHaveBeenCalledTimes(1);
  });
});
