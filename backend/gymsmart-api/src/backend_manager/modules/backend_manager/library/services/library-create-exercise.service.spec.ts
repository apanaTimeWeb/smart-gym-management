// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { LibraryCreateExerciseService } from '@/backend_manager/modules/backend_manager/library/services/library-create-exercise.service';

describe('LibraryCreateExerciseService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { createLibrary: jest.fn().mockResolvedValue(expected) };
    const service = new LibraryCreateExerciseService(dependency as never);
    const result = await service.createExercise({} as never);
    expect(result).toEqual(expected);
    expect(dependency.createLibrary).toHaveBeenCalledTimes(1);
    expect(dependency.createLibrary).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { createLibrary: jest.fn().mockRejectedValue(failure) };
    const service = new LibraryCreateExerciseService(dependency as never);
    await expect(service.createExercise({} as never)).rejects.toBe(failure);
    expect(dependency.createLibrary).toHaveBeenCalledTimes(1);
  });
});
