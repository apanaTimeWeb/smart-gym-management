// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { ManagerWorkoutCreateWorkoutService } from '@/backend_manager/manager_modules/workout/workout_services/manager-workout-create-workout.service';

describe('ManagerWorkoutCreateWorkoutService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { createWorkout: jest.fn().mockResolvedValue(expected) };
    const service = new ManagerWorkoutCreateWorkoutService(dependency as never);
    const result = await service.createWorkout({} as never);
    expect(result).toEqual(expected);
    expect(dependency.createWorkout).toHaveBeenCalledTimes(1);
    expect(dependency.createWorkout).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { createWorkout: jest.fn().mockRejectedValue(failure) };
    const service = new ManagerWorkoutCreateWorkoutService(dependency as never);
    await expect(service.createWorkout({} as never)).rejects.toBe(failure);
    expect(dependency.createWorkout).toHaveBeenCalledTimes(1);
  });
});
