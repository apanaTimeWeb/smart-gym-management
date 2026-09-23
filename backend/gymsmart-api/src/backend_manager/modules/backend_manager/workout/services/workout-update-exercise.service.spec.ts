// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { WorkoutUpdateExerciseService } from '@/backend_manager/modules/backend_manager/workout/services/workout-update-exercise.service';

describe('WorkoutUpdateExerciseService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { updateWorkoutById: jest.fn().mockResolvedValue(expected) };
    const service = new WorkoutUpdateExerciseService(dependency as never);
    const result = await service.updateExercise({} as never, 'test-id' as never);
    expect(result).toEqual(expected);
    expect(dependency.updateWorkoutById).toHaveBeenCalledTimes(1);
    expect(dependency.updateWorkoutById).toHaveBeenCalledWith(expect.anything(), expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { updateWorkoutById: jest.fn().mockRejectedValue(failure) };
    const service = new WorkoutUpdateExerciseService(dependency as never);
    await expect(service.updateExercise({} as never, 'test-id' as never)).rejects.toBe(failure);
    expect(dependency.updateWorkoutById).toHaveBeenCalledTimes(1);
  });
});
