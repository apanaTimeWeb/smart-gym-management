// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { LibraryDeleteExerciseService } from '@/backend_manager/modules/backend_manager/library/services/library-delete-exercise.service';

describe('LibraryDeleteExerciseService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { softDeleteLibraryById: jest.fn().mockResolvedValue(expected) };
    const service = new LibraryDeleteExerciseService(dependency as never);
    const result = await service.deleteExercise('test-id' as never);
    expect(result).toEqual(expected);
    expect(dependency.softDeleteLibraryById).toHaveBeenCalledTimes(1);
    expect(dependency.softDeleteLibraryById).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { softDeleteLibraryById: jest.fn().mockRejectedValue(failure) };
    const service = new LibraryDeleteExerciseService(dependency as never);
    await expect(service.deleteExercise('test-id' as never)).rejects.toBe(failure);
    expect(dependency.softDeleteLibraryById).toHaveBeenCalledTimes(1);
  });
});
