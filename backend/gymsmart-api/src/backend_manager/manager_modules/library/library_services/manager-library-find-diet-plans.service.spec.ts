// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { ManagerLibraryFindDietPlansService } from '@/backend_manager/manager_modules/library/library_services/manager-library-find-diet-plans.service';

describe('ManagerLibraryFindDietPlansService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findLibraryList: jest.fn().mockResolvedValue(expected) };
    const service = new ManagerLibraryFindDietPlansService(dependency as never);
    const result = await service.findDietPlans({} as never);
    expect(result).toEqual(expected);
    expect(dependency.findLibraryList).toHaveBeenCalledTimes(1);
    expect(dependency.findLibraryList).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findLibraryList: jest.fn().mockRejectedValue(failure) };
    const service = new ManagerLibraryFindDietPlansService(dependency as never);
    await expect(service.findDietPlans({} as never)).rejects.toBe(failure);
    expect(dependency.findLibraryList).toHaveBeenCalledTimes(1);
  });
});
