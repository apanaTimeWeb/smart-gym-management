// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { LibraryUpdateDietPlanService } from '@/backend_manager/modules/backend_manager/library/services/library-update-diet-plan.service';

describe('LibraryUpdateDietPlanService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { updateLibraryById: jest.fn().mockResolvedValue(expected) };
    const service = new LibraryUpdateDietPlanService(dependency as never);
    const result = await service.updateDietPlan({} as never, 'test-id' as never);
    expect(result).toEqual(expected);
    expect(dependency.updateLibraryById).toHaveBeenCalledTimes(1);
    expect(dependency.updateLibraryById).toHaveBeenCalledWith(expect.anything(), expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { updateLibraryById: jest.fn().mockRejectedValue(failure) };
    const service = new LibraryUpdateDietPlanService(dependency as never);
    await expect(service.updateDietPlan({} as never, 'test-id' as never)).rejects.toBe(failure);
    expect(dependency.updateLibraryById).toHaveBeenCalledTimes(1);
  });
});
