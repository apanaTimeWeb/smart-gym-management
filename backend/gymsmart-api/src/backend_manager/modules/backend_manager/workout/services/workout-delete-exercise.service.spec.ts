// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { WorkoutDeleteExerciseService } from '@/backend_manager/modules/backend_manager/workout/services/workout-delete-exercise.service';

describe('WorkoutDeleteExerciseService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { softDeleteWorkoutById: jest.fn().mockResolvedValue(expected) };
    const service = new WorkoutDeleteExerciseService(dependency as never);
    const result = await service.deleteExercise('test-id' as never);
    expect(result).toEqual(expected);
    expect(dependency.softDeleteWorkoutById).toHaveBeenCalledTimes(1);
    expect(dependency.softDeleteWorkoutById).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { softDeleteWorkoutById: jest.fn().mockRejectedValue(failure) };
    const service = new WorkoutDeleteExerciseService(dependency as never);
    await expect(service.deleteExercise('test-id' as never)).rejects.toBe(failure);
    expect(dependency.softDeleteWorkoutById).toHaveBeenCalledTimes(1);
  });
});
