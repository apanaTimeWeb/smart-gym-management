// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { PlansUpdatePlanService } from '@/backend_manager/modules/backend_manager/plans/services/plans-update-plan.service';

describe('PlansUpdatePlanService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { updatePlansById: jest.fn().mockResolvedValue(expected) };
    const service = new PlansUpdatePlanService(dependency as never);
    const result = await service.updatePlan({} as never, 'test-id' as never);
    expect(result).toEqual(expected);
    expect(dependency.updatePlansById).toHaveBeenCalledTimes(1);
    expect(dependency.updatePlansById).toHaveBeenCalledWith(expect.anything(), expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { updatePlansById: jest.fn().mockRejectedValue(failure) };
    const service = new PlansUpdatePlanService(dependency as never);
    await expect(service.updatePlan({} as never, 'test-id' as never)).rejects.toBe(failure);
    expect(dependency.updatePlansById).toHaveBeenCalledTimes(1);
  });
});
