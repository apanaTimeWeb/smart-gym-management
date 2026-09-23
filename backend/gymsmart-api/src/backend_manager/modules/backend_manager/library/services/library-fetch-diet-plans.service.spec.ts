// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { LibraryFetchDietPlansService } from '@/backend_manager/modules/backend_manager/library/services/library-fetch-diet-plans.service';

describe('LibraryFetchDietPlansService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findLibraryList: jest.fn().mockResolvedValue(expected) };
    const service = new LibraryFetchDietPlansService(dependency as never);
    const result = await service.fetchDietPlans({} as never);
    expect(result).toEqual(expected);
    expect(dependency.findLibraryList).toHaveBeenCalledTimes(1);
    expect(dependency.findLibraryList).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findLibraryList: jest.fn().mockRejectedValue(failure) };
    const service = new LibraryFetchDietPlansService(dependency as never);
    await expect(service.fetchDietPlans({} as never)).rejects.toBe(failure);
    expect(dependency.findLibraryList).toHaveBeenCalledTimes(1);
  });
});
