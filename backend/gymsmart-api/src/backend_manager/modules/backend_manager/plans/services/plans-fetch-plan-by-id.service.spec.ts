// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { PlansFetchPlanByIdService } from '@/backend_manager/modules/backend_manager/plans/services/plans-fetch-plan-by-id.service';

describe('PlansFetchPlanByIdService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findPlansByIdOrThrow: jest.fn().mockResolvedValue(expected) };
    const service = new PlansFetchPlanByIdService(dependency as never);
    const result = await service.fetchPlanById('test-id' as never, {} as never);
    expect(result).toEqual(expected);
    expect(dependency.findPlansByIdOrThrow).toHaveBeenCalledTimes(1);
    expect(dependency.findPlansByIdOrThrow).toHaveBeenCalledWith(expect.anything(), expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findPlansByIdOrThrow: jest.fn().mockRejectedValue(failure) };
    const service = new PlansFetchPlanByIdService(dependency as never);
    await expect(service.fetchPlanById('test-id' as never, {} as never)).rejects.toBe(failure);
    expect(dependency.findPlansByIdOrThrow).toHaveBeenCalledTimes(1);
  });
});
