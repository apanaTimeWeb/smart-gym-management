// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { ManagerWorkoutDeleteExerciseService } from '@/backend_manager/manager_modules/workout/workout_services/manager-workout-delete-exercise.service';

describe('ManagerWorkoutDeleteExerciseService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { deleteWorkout: jest.fn().mockResolvedValue(expected) };
    const service = new ManagerWorkoutDeleteExerciseService(dependency as never);
    const result = await service.deleteExercise('test-id' as never);
    expect(result).toEqual(expected);
    expect(dependency.deleteWorkout).toHaveBeenCalledTimes(1);
    expect(dependency.deleteWorkout).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { deleteWorkout: jest.fn().mockRejectedValue(failure) };
    const service = new ManagerWorkoutDeleteExerciseService(dependency as never);
    await expect(service.deleteExercise('test-id' as never)).rejects.toBe(failure);
    expect(dependency.deleteWorkout).toHaveBeenCalledTimes(1);
  });
});
