// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { PlansDeletePlanService } from '@/backend_manager/manager_modules/plans/plans_services/manager-plans-delete-plan.service';

describe('PlansDeletePlanService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { deletePlan: jest.fn().mockResolvedValue(expected) };
    const service = new PlansDeletePlanService(dependency as never);
    const result = await service.deletePlan('test-id' as never);
    expect(result).toEqual(expected);
    expect(dependency.deletePlan).toHaveBeenCalledTimes(1);
    expect(dependency.deletePlan).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { deletePlan: jest.fn().mockRejectedValue(failure) };
    const service = new PlansDeletePlanService(dependency as never);
    await expect(service.deletePlan('test-id' as never)).rejects.toBe(failure);
    expect(dependency.deletePlan).toHaveBeenCalledTimes(1);
  });
});
