// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { ManagerLibraryDeleteExerciseService } from '@/backend_manager/manager_modules/library/library_services/manager-library-delete-exercise.service';

describe('ManagerLibraryDeleteExerciseService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { deleteLibraryById: jest.fn().mockResolvedValue(expected) };
    const service = new ManagerLibraryDeleteExerciseService(dependency as never);
    const result = await service.deleteExercise('test-id' as never);
    expect(result).toEqual(expected);
    expect(dependency.deleteLibraryById).toHaveBeenCalledTimes(1);
    expect(dependency.deleteLibraryById).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { deleteLibraryById: jest.fn().mockRejectedValue(failure) };
    const service = new ManagerLibraryDeleteExerciseService(dependency as never);
    await expect(service.deleteExercise('test-id' as never)).rejects.toBe(failure);
    expect(dependency.deleteLibraryById).toHaveBeenCalledTimes(1);
  });
});
